const uploadFile=async()=> {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    try{
        if (file) {
            var formData = new FormData();
            formData.append('file', file);
    
            await fetch('http://localhost:3000/api/upload/', {
                method: 'POST',
                headers : { 
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json",
                         },
                body: formData
            })
            .then(response => {response.json()
            console.log(response);})
            .then(data => {
                document.getElementById('response').innerHTML = 'File uploaded successfully!';
            })
        }
        else {
            alert('Please select a file.');
        }
    }
    catch(error) {
        console.error('Error :' + error);
        document.getElementById('response').innerHTML = 'Error uploading file.';
    }
}