const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  placeName: { type: String, required: true },
  address: String,
  lat: Number,
  lng: Number,
  review: String,        
  expense: Number,       
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
