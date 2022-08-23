import multer from "multer";
import { FileUtils } from "./fileUtils";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.env.UPLOAD_URL)
  },
  filename(req, file, cb) {
    cb(null, FileUtils.generateUploadFileName(file))
  }
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(FileUtils.getFileExtension(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only');
  }
}

export const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
});