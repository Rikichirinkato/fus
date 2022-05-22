const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

let filename;

app.use(fileUpload());

app.post('/upload', (req, res) => {

    if (req.files && Object.keys(req.files).length !== 0) {
        
        const uploadedFile = req.files.uploadFile;
        const uploadPath = __dirname + '/uploads/' + uploadedFile.name;
        filename = uploadedFile.name;

        uploadedFile.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                res.send('file wasn\'t uploaded');
            } else {
                res.send('success, now you may return to prev page');
            };
        });
    } else {
        res.send('nothing to upload')
    };
});

app.get('/download', (req, res) => {
    if (filename) {
        res.download(__dirname + '/uploads/' + filename, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(4200, (req, res) => {
    console.log('Started listening to port 4200');
});
