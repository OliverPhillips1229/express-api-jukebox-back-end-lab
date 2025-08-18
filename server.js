
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';
import tracksRouter from './routes/tracks.js';

import https from 'https';
import fs from 'fs';


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jukebox';


let useHttps = false;
let sslOptions = {};
try {
  sslOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert')
  };
  useHttps = true;
} catch (err) {
  console.warn('SSL certs not found or invalid, falling back to HTTP.');
}

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/tracks', tracksRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Reactville Jukebox API!');
});



mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (useHttps) {
      https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`HTTPS Server running on port ${PORT}`);
      });
    } else {
      app.listen(PORT, () => {
        console.log(`HTTP Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
