const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 파일이 저장될 위치
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // 파일명 설정
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
//s3
//cloudfront
