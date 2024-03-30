const express = require("express");
const multer = require("multer");
//const upload = multer({ dest: "uploads/" });
const upload = require("../../utils/multer");
const { board_controller } = require("../controller");

const router = express.Router();

router.post("/post", upload.fields([{ name: "image" }]), board_controller.Post);
router.delete("/delete/:id", board_controller.Delete);
router.post("/update", board_controller.Update);
router.get("/get", board_controller.Get); //목록조회
router.get("/getpost/:id", board_controller.GetPost); // 상세보기
router.post("/search", board_controller.Search);

router.get("/chatrooms", board_controller.ChatRooms); // 마이페이지 만들어서 보드에서 빼야댐
module.exports = router;
