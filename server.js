const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();

const trackRouter = require('.controllers/tracks.js')

app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(methodOverride('_method'));

app.use(express.json());

app.use('/tracks', trackRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});