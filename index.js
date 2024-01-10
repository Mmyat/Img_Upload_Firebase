const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
const port=3000;
try {
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb+srv://myo_myat_zaw_guru:z9sUTVdXKfbZREAQ@cluster0.woecefd.mongodb.net/?retryWrites=true&w=majority") 
    console.log('MongoDB is connected')
} catch(error) {
    console.log(error)
    process.exit()
}
// Create a MongoDB schema and model
const imageSchema = new mongoose.Schema({
  filename: String,
});

const Image = mongoose.model('Image', imageSchema);
// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
//
app.use('/images', express.static('images'))
app.get('/images/:filename', (req, res) => {
  const imagename = req.params.filename
  const readStream = fs.createReadStream(`public/images/${imagename}`)
  readStream.pipe(res)
})
// Set up routes
// app.get('/allimages/', async( req,res,next)=>{
//   try{
//       const images = await Image.find({})
//       if(!images) {
//           res.status(404).send({error: "Item not found"})
//       }
//       images.map((data)=>{
//         res.status(200).sendFile(data.path)
//       })
//   } catch (error) {
//       res.status(400).send(error)
//   }
// });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // const newImage = new Image({
    //   filename: req.file.filename,
    //   path: req.file.path,
    // });
    // await newImage.save();
    await axios.post('https://product-shop-43203-default-rtdb.firebaseio.com/contact-list.json',newContact)
    res.send('Image uploaded and saved to MongoDB.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});