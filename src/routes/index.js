const { Router } = require('express');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+'-'+file.originalname)
  }
});
const upload = multer({ storage });

// Controllers
const UploadController = require('../controller/UploadController');
const InitialController = require('../controller/InitialController');

const router = Router();

router.get('', InitialController.teste)
router.post('/upload', upload.single('file'), UploadController.uploadFile);
router.get('/consumir', upload.single('file'), UploadController.consumirApi);


module.exports = router;