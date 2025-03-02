require('dotenv').config();

const express = require('express');
const multer = require('multer');
const path = require('path');
// const anthropic = require('../../claude/anthropicClient');
const fs = require('fs');
const ExifParser = require('exif-parser');

const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

const router = express.Router();

// Helper functions
function retrieveMetadata(imageURL) {
    const buffer = fs.readFileSync(imageURL);
    const parser = ExifParser.create(buffer);
    const metadata = parser.parse();
    // console.log(metadata);

    const dateObj = new Date(metadata.tags.DateTimeOriginal*1000);
    const date = dateObj.toISOString().split('T')[0];  // "YYYY-MM-DD"
    const time = dateObj.toISOString().split('T')[1].split('Z')[0];  // "HH:MM:SS" UTC

    return {
        'Latitude': metadata.tags.GPSLatitude,
        'Longitude': metadata.tags.GPSLongitude,
        'Date': date,
        'Time': time,
    };
}

async function classifyImage(imageURL) {
    const buffer = fs.readFileSync(imageURL);
    const imageData = buffer.toString('base64');

    const message = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 1024,
        messages: [
            {
            role: 'user',
            content: [
                {
                    type: 'image',
                    source: {
                        type: 'base64',
                        media_type: 'image/jpeg',
                        data: imageData,
                    },
                },
                {
                    type: 'text',
                    text: 'Read the image data. Determine its category from the following pool: Food, Scenery, People. Only return the category word itself.',
                },
            ],
            },
        ],
    });
    
    if (!message || !message.content) {
        throw Error("No response from Claude");
    }

    const category = message.content[0].text;
    return category;
}

// Multer
const FILES_DIR = path.join(__dirname, '../../files/');

if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, FILES_DIR);
    },
    filename: async (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 50*1024*1024},
    fileFilter: (req, file, cb) => {
        // const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4', '.mov', '.avi'];
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
            return cb(new Error(`Invalid file type: ${ext}. Allowed formats: ${allowedExtensions.join(', ')}`), false);
        }
        cb(null, true);
    }
});

router.post("/", upload.array('files'), async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ status: 'error', msg: 'No files uploaded' });
      }
      console.log("Entered upload endpoint");

      // Construct file metadata
      const processedFiles = await Promise.all(req.files.map(async (file) => {
        const filePath = path.join(FILES_DIR, file.filename);
            let metadata = retrieveMetadata(filePath);
            let category = await classifyImage(filePath);

            console.log(`Metadata for ${file.filename}:`, metadata);
            console.log(`Category: ${category}`);

            const originalName = path.parse(file.originalname).name;
            const extension = path.extname(file.originalname);
            const newFilename = `${originalName}_${metadata.Date}_${metadata.Time}_${category}${extension}`;
            const newFilePath = path.join(FILES_DIR, newFilename);

            fs.renameSync(filePath, newFilePath);

            return {
                filename: newFilename,
                type: file.mimetype.includes('image') ? 'image' : 'video',
                metadata: {
                    latitude: metadata.Latitude,
                    longitude: metadata.Longitude
                }
            };
      }));
  
      res.status(201).json({ status: 'success', data: processedFiles });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ status: 'error', msg: error.message });
    }
});  

module.exports = router;
