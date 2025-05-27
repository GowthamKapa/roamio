const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bookmarkRoutes = require('./routes/bookmarks');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bookmarks', bookmarkRoutes);

// Temporary test route
app.get('/test', (req, res) => {
    res.send('Test route is working!');
  });
  
app.use('/api/bookmarks', bookmarkRoutes); 

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));



  