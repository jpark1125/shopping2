const express = require("express");
const { cart_controller } = require("../controller");
const router = express.Router();

router.post("/addcart/:id", cart_controller.AddCart);
router.get("/getcart", cart_controller.GetCart);
router.delete("/deletecart/:id", cart_controller.DeleteCart);

module.exports = router;
