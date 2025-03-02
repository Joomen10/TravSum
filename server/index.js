require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5050;

const uploadRoute = require('./routes/upload/index.js');
const createRoute = require('./routes/create/index.js');

app.use(bodyParser.json());
app.use(cors());

app.use('/upload', uploadRoute);
app.use('/create', createRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
