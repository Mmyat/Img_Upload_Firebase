const axios = require('axios')
var fs = require('fs');
const FormData = require('form-data'); // npm install --save form-data
const form = new FormData();
headers = { "Content-Type": "image/jpg" };
form.append('MyImage', fs.createReadStream("D:/CV/MyImage.jpg"))
axios.post(`http://localhost:3000/upload/`,{
    filename : "MyImage.jpg",
    path : "D:/CV/MyImage.jpg"
},{headers}).then((res)=>{console.log(res.data);})
.catch( (error)=> {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
})