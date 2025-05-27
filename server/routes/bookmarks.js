const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

// POST /api/bookmarks
router.post('/', async (req, res) => {
    const { userId, placeName, address, lat, lng, review, expense } = req.body;
  
    if (!userId || !placeName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const newBookmark = new Bookmark({
        userId,
        placeName,
        address,
        lat,
        lng,
        review,
        expense,
      });
  
      await newBookmark.save();
      res.status(201).json({ message: 'Bookmark saved', bookmark: newBookmark });
    } catch (err) {
      res.status(500).json({ message: 'Error saving bookmark', error: err });
    }
  });
  

// GET /api/bookmarks?userId=abc123
router.get('/', async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
  
    try {
      const bookmarks = await Bookmark.find({ userId });
      res.json({ bookmarks });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching bookmarks', error: err });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await Bookmark.findByIdAndDelete(req.params.id);
      res.json({ message: 'Bookmark deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting bookmark', error: err });
    }
  });

  router.put('/:id', async (req, res) => {
    const { review, expense } = req.body;
  
    try {
      const updated = await Bookmark.findByIdAndUpdate(
        req.params.id,
        { review, expense },
        { new: true }
      );
      res.json({ message: 'Updated', bookmark: updated });
    } catch (err) {
      res.status(500).json({ message: 'Error updating bookmark', error: err });
    }
  });
  
  

module.exports = router;
