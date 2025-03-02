require('dotenv').config();

const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

router.post("/", async (req, res) => {
    try {
      // server//[original_name]_[YYYY-MM-DD]_[HH-MM-SS]_[category].[extension]
      // parameters: list of file paths, theme: String (either "Food" or "Scenery" or "People")
      const { filePaths, theme } = req.body;
      console.log(filePaths);
      console.log(theme);
      
      const matchingFilePaths = filePaths.filter(filePath => {
        // Extract the category from the file path
        const fileNameParts = filePath.split('_');
        const category = fileNameParts[fileNameParts.length-1].split('.')[0];
        console.log(category);
        return category===theme;
      });
        res.status(201).json({ status: 'success', data: matchingFilePaths });

      

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ status: 'error', msg: error.message });
    }
});


module.exports = router;
