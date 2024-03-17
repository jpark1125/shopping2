const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { adminboard_controller } = require("../controller");

const router = express.Router();

router.post("/post", adminboard_controller.Post);
router.post("/delete", adminboard_controller.Delete);
router.post("/update", adminboard_controller.Update);
router.get("/get", adminboard_controller.Get);
//router.post("/updatecontent", adminboard_controller.Updatcontent);
//router.post("/updatetitle", adminboard_controller.Updatetitle);
//router.post("/deleteimage", adminboard_controller.Deleteimage);
router.post("/search", adminboard_controller.Search);

module.exports = router;
