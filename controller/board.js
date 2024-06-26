const { Board } = require("../models");
//const { Op } = require("sequelize");
//const { Users } = require("../models");
const { B, A } = require("../prototype");
const jwt = require("../utils/jwt");
const { sequelize, QueryTypes } = require("../models");
const axios = require("axios");
const board = new B();

module.exports = {
  Get: async (req, res) => {
    try {
      const posts = await board.getAllPosts();
      return res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  GetPost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await board.getPostById(id);

      return res.status(200).json({ post });
    } catch (err) {
      console.error(err);
      res.status(404).json({ error: "Post not found" });
    }
  },

  Search: async (req, res) => {
    try {
      const { title, content } = req.body;
      const posts = await board.searchPosts({ title, content });
      return res.status(200).json({ posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Inquiry: async (req, res) => {
    try {
      const { xauth } = req.headers;

      const decoded = jwt.verifyToken(xauth);
      const clientId = decoded.id;

      const postId = req.body.id;

      const post = await Board.findByPk(postId, {
        attributes: ["userId"],
      });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      const adminId = post.userId;

      await axios.post("http://127.0.0.1:3002/api/chatroom", {
        clientId,
        adminId,
      });

      res.status(200).json({ message: "Inquiry initiated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
