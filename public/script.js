const uploadFile=async()=> {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    try{
        // if (file) {
        //     var formData = new FormData();
        //     formData.append('file', file);
        //     const uploader = await axios.post('http://localhost:3000/api/upload/',{formData})
        //     const {data} = uploader;
        //     console.log(data);
        //     document.getElementById('response').innerHTML = 'File uploaded successfully!';
        // }
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
    
            await fetch('your-api-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('response').innerHTML = 'File uploaded successfully!';
            })
        }
        else {
            alert('Please select a file.');
        }
    }
    catch(error) {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error uploading file.';
    }
}