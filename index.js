const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('../Key/product-shop-43203-firebase-adminsdk-ppzcj-bd5e36e414.json');
const uuid = require('uuid-v4')
const app = express();
const axios = require('axios');
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://product-shop-43203-default-rtdb.firebaseio.com",
  storageBucket: "product-shop-43203.appspot.com",
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//
const bucket = admin.storage().bucket();
// Define the route for file uploads
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    } 
    const fileBuffer =req.file.buffer;
    const uniqueFileName = `${Date.now()}_${req.file.originalname}`;
    const file = bucket.file(uniqueFileName);
    const token = uuid();
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens : token,
        contentType: req.file.mimetype,
      },
    };
    const fileStream = file.createWriteStream({
      metadata : metadata,
      gzip : true
    })
//Stream error Response
    fileStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
//Stream success Response
    fileStream.on('finish', () => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uniqueFileName}?alt=media&token=${token}`
      res.status(201).send(imageUrl);
    });
//Stream end
    fileStream.end(fileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});