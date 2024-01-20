const express = require('express');
const multer = require("multer");
const os = require("os");

const router = express.Router();

const uploadController = require('../controllers/upload.controller');

const storage = multer.diskStorage({ destination: os.tmpdir(), filename: (req, file, callback) => callback(null, `${file.originalname}`) });

const upload = multer({ storage: storage });

// router.post('/upload', upload.single("file"), uploadController.uploadFiles)
// router.post('/upload', upload.single("file"), uploadController.uploadFiles)
router.post('/upload', upload.single("file"), uploadController.uploadFiles)
router.get('/files', uploadController.getListFiles);

module.exports = router;