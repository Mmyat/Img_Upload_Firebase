'use strict';
const express = require('express');
const cors = require('cors');
const port = 3000 ;
const imageRoute = require('./routes/image-route');
// import our current configuration
const config = require('./config');
// set up our app using express
const app = express();
// express setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// routes (for uploading images to storage)
app.use('/api', imageRoute.routes)
app.listen(port, () => {
console.log ("app is listening on port:", port);
})