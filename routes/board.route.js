const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { board_controller } = require("../controller");

const router = express.Router();

router.get("/getpost/:id", board_controller.GetPost);
router.get("/get", board_controller.Get);
router.post("/search", board_controller.Search);
//("/cart",isBuyer, board_controller.Cart); 장바구니담기
//("/cartget", isBuyer, board_controller.Cartget); 장바구니 조회
//("cartdelete", isBuyer, board_controller.Cartdelete); 장바구니 삭제
router.post("/getpost/:id/inquire", board_controller.Inquiry);
module.exports = router;
