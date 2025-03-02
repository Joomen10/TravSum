require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ffmpeg = require('fluent-ffmpeg');

const FILES_DIR = path.join(__dirname, '../../files/');

router.post("/", async (req, res) => {
    try {
      // server//[original_name]_[YYYY-MM-DD]_[HH-MM-SS]_[category].[extension]
      // parameters: list of file paths, theme: String (either "Food" or "Scenery" or "People")
    //   const { filePaths, theme } = req.body;
      
    //   const matchingFilePaths = filePaths.filter(filePath => {
    //     // Extract the category from the file path
    //     const fileNameParts = filePath.split('_');
    //     const category = fileNameParts[fileNameParts.length-1].split('.')[0];
    //     console.log(category);
    //     return category===theme;
    //   });

    //   if (matchingFilePaths.length<1) {
    //     res.status(400).json({ status: 'error', msg: 'no matching images' });
    //   }
    //   console.log(matchingFilePaths);
    //   const { filePaths } = req.body;
        const { theme } = req.body;
        fs.readdir(FILES_DIR, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                return res.status(500).json({ error: "Failed to read directory" });
            }
            console.log(files);

            const matchingFilePaths = files
                .filter(file => {
                    const fileNameParts = file.split('_');
                    const category = fileNameParts[fileNameParts.length - 1].split('.')[0];
                    console.log(category);
                    return category===theme;
                })
                .map(file => path.join(FILES_DIR, file));

            if (matchingFilePaths.length === 0) {
                return res.status(404).json({ error: `No matching images` });
            }

            // Define output video file
            const outputVideo = path.join(FILES_DIR, `video_${Date.now()}.mp4`);
            const ffmpegCommand = ffmpeg();

            // Add images to FFmpeg processing
            console.log(matchingFilePaths);
            matchingFilePaths.forEach((file) => {
                ffmpegCommand.input(file).inputOptions('-framerate 1/3'); // 3 seconds per image
            });

            ffmpegCommand
                .on('end', async () => {
                    console.log('Video processing complete:', outputVideo);
                    res.json({ videoUrl: path.join(FILES_DIR, outputVideo) });
                    // res.download(outputVideo, 'output.mp4', async () => {
                    //     await fs.promises.unlink(outputVideo); // Remove the video after download
                    // });
                })
                .on('error', (err) => {
                    console.error('FFmpeg error:', err);
                    res.status(500).json({ error: 'Video processing failed', details: err.message });
                })
                .output(outputVideo)
                .outputOptions(['-c:v libx264', '-r 30', '-pix_fmt yuv420p'])
                .run();
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ status: 'error', msg: error.message });
    }
});

module.exports = router;
