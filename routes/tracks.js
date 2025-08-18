import express from 'express';
import Track from '../models/Track.js';

const router = express.Router();

// Create a track
router.post('/', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const track = new Track({ title, artist });
    await track.save();
    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single track
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a track
router.put('/:id', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      { title, artist },
      { new: true, runValidators: true }
    );
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a track
router.delete('/:id', async (req, res) => {
  try {
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.status(200).json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
