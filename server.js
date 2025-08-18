import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import methodOverride from 'method-override';
import tracksRouter from './routes/tracks.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jukebox';

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/tracks', tracksRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Reactville Jukebox API!');
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
