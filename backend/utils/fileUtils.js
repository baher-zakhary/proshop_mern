import path from "path";

export const FileUtils = {
  getFileExtension(fileName) {
    return path.extname(fileName);
  },
  generateUploadFileName(file) {
    return `${file.fieldname}-${Date.now()}${FileUtils.getFileExtension(file.originalname)}`;
  }
}