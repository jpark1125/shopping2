const express = require("express");
//const { board_controller } = require("../controller");
const { cart_controller } = require("../controller");
const router = express.Router();

router.post("/addcart/:id", cart_controller.AddCart); //장바구니담기
router.get("/getcart", cart_controller.GetCart); //장바구니 조회
router.delete("/deletecart/:id", cart_controller.DeleteCart); //장바구니 삭제

module.exports = router;
