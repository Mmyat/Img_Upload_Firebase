// app.js
const express = require('express');
const axios = require('axios')
const app = express();
const port = 3000;

// Set up routes
app.post('/upload', async(req, res) => {
    if (req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    try{
      const url = 'gs://product-shop-43203.appspot.com';
      const newImage = req.file
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      await  axios.post(url, newImage,config)
      res.status(201).json({ message: 'Image uploaded successfully'});
    }
    catch(error){
      return res.status(500).json({ message: error });
    }
  })
  app.get('/upload',(req,res)=>{
    res.send("Hello Requester")
})
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
