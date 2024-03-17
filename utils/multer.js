const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //파일이 저장될 위치 정의하기
  },
  filename: (req, file, cb) => {
    //파일명 지정하기
    //cb(null, file.originalname) //cb 콜백함수를 통해 전송된 파일 이름 설정
    cb(null, new Date().valueOf() + path.extname(file.originalname)); //시스템 시간으로 파일 이름 설정
  },
});

module.exports = image;
