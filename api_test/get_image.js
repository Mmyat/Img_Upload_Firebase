const axios = require('axios')
axios.get("http://localhost:3000/upload/",
).then((res)=>{console.log(res.data);})
.catch( (error)=> {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
})