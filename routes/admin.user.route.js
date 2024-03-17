const express = require("express");
const router = express.Router();
const { adminuser_controller } = require("../controller");

router.post("/chk/nickname", adminuser_controller.CheckDuplicateNickname);
router.post("/chk/email", adminuser_controller.CheckDuplicateEmail);
router.post("/signup", adminuser_controller.SignUp);
router.post("/login", adminuser_controller.LogIn);
router.get("/issued/token", adminuser_controller.IssuedToken);
router.get("/auto/login", adminuser_controller.AutoIssuedToken);
router.get("/mypage", adminuser_controller.MyPage);
router.post("/update/mypage", adminuser_controller.UpdateMyPage);

module.exports = router;
