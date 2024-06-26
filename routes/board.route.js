const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { board_controller } = require("../controller");

const router = express.Router();

router.get("/getpost/:id", board_controller.GetPost);
router.get("/get", board_controller.Get);
router.post("/search", board_controller.Search);
router.post("/getpost/inquiry", board_controller.Inquiry);

module.exports = router;
