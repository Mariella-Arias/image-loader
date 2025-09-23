// Imports
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Port
const port = 3000;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'uploads')));

const cors = require('cors');
app.use(cors());

// multer config to store files on server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage }).single('avatar');

// ROUTES
/*
Uploads a single file
*/
app.post('/api/images', (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // a Multer error occurred when uploading
      next(err);
    } else if (err) {
      // an unknown error occurred when uploading.
      next(err);
    }

    // file uploaded successfully
    return res.status(201).json(req.file);
  });
});

/*
Reads all files in dir /uploads
*/
app.get('/api/images', (req, res, next) => {
  let filenames = fs.readdirSync('./uploads');
  const files = [];

  filenames.forEach((file, idx) => {
    const extension = path.extname(file);
    const fileName = file.slice(0, file.indexOf(extension));

    files.push({ path: file, label: fileName, id: idx });
  });

  return res.status(200).json(files);
});

/*
Deletes file req.params.imagePath
*/
app.delete('/api/images/:imagePath', (req, res, next) => {
  const target = `./uploads/${req.params.imagePath}`;

  fs.unlink(target, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      next(err);
    }

    return res.send(204);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
