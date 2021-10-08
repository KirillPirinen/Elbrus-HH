const multer  = require('multer')

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({storage:storageConfig});

module.exports = upload;
