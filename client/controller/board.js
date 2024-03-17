const { Board } = require("../models");
const { Op } = require("sequelize");
const { Users } = require("../models");
const { B, A } = require("../prototype");
const jwt = require("../../utils/jwt");
const { sequelize, QueryTypes } = require("../models");

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
      const postId = req.params.id; // URL에서 게시글 ID 추출
      const post = await board.getPostById(postId);

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
};
