const express = require('express');
const multer = require('multer');
const axios = require('axios');
var admin = require("firebase-admin");
const firebase = require("firebase")
var serviceAccount = require("../../Mypj/Key/product-shop-43203-firebase-adminsdk-ppzcj-bd5e36e414.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://product-shop-43203-default-rtdb.firebaseio.com",
  storageBucket: "gs://product-shop-43203.appspot.com",
});


const app = express();
const port = 3000;
const fireStorage = firebase.storage().ref();
// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage , limits: { fileSize: 1024 * 1024 * 10 }});
// Express route for file upload
app.post('/upload', upload.single('file'),async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    var bucket = admin.storage().bucket();
    const imageRef = fireStorage.child(fileName);
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
