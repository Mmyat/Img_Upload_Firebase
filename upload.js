const express = require('express');
const multer = require('multer');
const axios = require('axios');
var admin = require("firebase-admin");
const firebase = require("firebase")
var serviceAccount = require("../../My Pj/Key/product-shop-43203-firebase-adminsdk-ppzcj-0fe0ee0d04.json");
//
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});
// Express route for file upload
app.post('/upload', upload.single('file'),async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const firebase = require('../db');  // reference to our db 
    const firestorage = firebase.firestore().ref();
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const imageRef = firestorage.child(fileName);
    //
    await imageRef.put(fileBuffer);
    // Upload file to Firebase Storage using Axios
    // const response = await axios.post(
    //   `https://firebasestorage.googleapis.com/v0/b/${admin.app().options.storageBucket}/o/${encodeURIComponent(fileName)}`,
    //   fileName,
    //   fileBuffer,
    //   {
    //     headers: {
    //       'Content-Type': req.file.mimetype,
    //       // Authorization: `Bearer ${await admin.app().auth().createCustomToken('some-uid')}`, // Replace 'some-uid' with a valid UID
    //     },
    //   }
    // );

    console.log('File uploaded successfully to Firebase Storage:', response.data);
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
