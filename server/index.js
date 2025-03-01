require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const ExifParser = require('exif-parser');
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors());

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

    // console.log(message);
    return message.content.text;
}




app.get('/', (req, res) => {
  res.send('Hello World!');
  baseUrl = "/Users/hoonit4/Documents/Projects/Images/server/IMG_0848.jpg";
  metadata = retrieveMetadata(baseUrl);
  console.log(metadata);
  category = classifyImage(baseUrl);
  console.log(category);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
