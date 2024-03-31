const { Board } = require("../models");
const { Op } = require("sequelize");
const { Users } = require("../models");
const { B, A, C } = require("../prototype");
const jwt = require("../utils/jwt");
const { sequelize, QueryTypes } = require("../models");
const cart = new C();

module.exports = {
  AddCart: async (req, res) => {
    try {
      const { xauth } = req.headers;
      console.log("xauth:", xauth);
      const decoded = jwt.verifyToken(xauth);
      console.log("decoded", decoded);
      const userId = decoded.id;
      //const postId = req.body.id;
      const postId = req.params.id;

      await cart.addCartItem(userId, postId);

      res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.error(error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  GetCart: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const userId = decoded.id;

      const postIds = await cart.getCartItems(userId);

      if (postIds.length === 0) {
        return res
          .status(200)
          .json({ message: "Your cart is empty", cartItems: [] });
      }

      // postId가 문자열 배열이러소 where조건에 맞게 쿼리 수정필요하긴함
      const cartItems = await Board.findAll({
        attributes: ["id", "userId", "title", "image"],
        where: {
          id: postIds,
        },
      });

      const modifiedCartItems = cartItems.map((post) => {
        let firstImage = null;

        if (post.image) {
          const images = post.image.split(",");
          if (images.length > 0) {
            firstImage = images[0];
          }
        }
        return {
          id: post.id,
          userId: post.userId,
          title: post.title,
          image: firstImage,
        };
      });

      res.status(200).json(modifiedCartItems);
    } catch (error) {
      console.error(error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  DeleteCart: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const userId = decoded.id;

      const postId = req.params.id;

      const result = await cart.removeCartItem(userId, postId);

      if (result === 0) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
      console.error(error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
