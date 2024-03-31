const express = require("express");
const multer = require("multer");
const upload = require("../../utils/multer");
const { board_controller } = require("../controller");

const router = express.Router();

router.post("/post", upload.fields([{ name: "image" }]), board_controller.Post);
router.delete("/delete/:id", board_controller.Delete);
router.post("/update", board_controller.Update);
router.get("/get", board_controller.Get);
router.get("/getpost/:id", board_controller.GetPost);
router.post("/search", board_controller.Search);

router.get("/chatrooms", board_controller.ChatRooms);
module.exports = router;
