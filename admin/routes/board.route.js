const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { board_controller } = require("../controller");

const router = express.Router();

router.post("/post", board_controller.Post);
router.post("/delete", board_controller.Delete);
router.post("/update", board_controller.Update);
router.get("/get", board_controller.Get); //목록조회
router.get("/getpost", board_controller.GetPost); // 상세보기
//router.post("/updatecontent", board_controllerr.Updatcontent);
//router.post("/updatetitle", board_controller.Updatetitle);
//router.post("/deleteimage", board_controller.Deleteimage);
router.post("/search", board_controller.Search);

module.exports = router;
