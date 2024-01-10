// app.js
const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

// Configure Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB Connection
const uri = 'mongodb+srv://myo_myat_zaw_guru:z9sUTVdXKfbZREAQ@cluster0.woecefd.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'images';
const db = MongoClient.db(dbName);
MongoClient.connect(uri, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Connected to MongoDB');
});
  // Set up routes
  app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const collection = db.collection('images');
    const { originalname, buffer } = req.file;

    collection.insertOne({ name: originalname, image: buffer }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error storing image in database' });
      }

      res.status(201).json({ message: 'Image uploaded successfully', fileId: result.insertedId });
    });
  });

  app.get('/images/:id', (req, res) => {
    const collection = db.collection('images');
    const fileId = req.params.id;

    collection.findOne({ _id: new MongoClient.ObjectId(fileId) }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving image from database' });
      }

      if (!result) {
        return res.status(404).json({ message: 'Image not found' });
      }

      res.setHeader('Content-Type', 'image/jpeg');
      res.send(result.image);
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
