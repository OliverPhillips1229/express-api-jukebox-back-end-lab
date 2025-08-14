const Track = require('../models/track.js');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.post('/', async (req, res) => {
    try {
        const createdTrack = await Track.create(req.body);
        res.status(201).json(createdTrack);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const foundTrack = await Track.find();
        res.status(200).json(foundTracks)
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.get('/:trackId', async (req, res) => {
    try {
        const foundTrack = await Track.findById(req.params.trackId);
        if (!foundTrack) {
            res.status(404);
            throw new Error('Track not found.');
        }
        res.status(200).json(foundTrack);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.delete('/:trackId', async (req, res) => {
    try {
        const deletedTrack = await Track.findByAndDelete(req.params.trackId);
        if (!deletedTrack) {
            res.status(404);
            throw new Error('Track not found.');
        }
        res.status(200).json({ message: 'Track deleted successfully.' });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.put('/:trackId', async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.petId, req.body, {
            new: true,
        });
        if (!updatedPet) {
            res.status(404);
            throw new Error('Track not found.');
        }
        res.status(200).json(updatedTrack)
    } catch {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
}); 

module.export = router;