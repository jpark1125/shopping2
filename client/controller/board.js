const { Board } = require("../models");
const { Op } = require("sequelize");
const { Users } = require("../models");
const { B, A } = require("../prototype");
const jwt = require("../../utils/jwt");
const { sequelize, QueryTypes } = require("../models");

const board = new B();

module.exports = {
  Post: async (req, res) => {
    try {
      const { title, content } = req.body;
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);

      const images = req.files.image.map((file) => "/img/" + file.fileName);

      const result = await board.createPost({
        title,
        content,
        images,
        userId: decoded.id,
      });

      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Delete: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const result = await board.deletePost(decoded.id);

      if (result) return res.status(200).json({ result });
      else res.status(404).json({ error: "Post not found" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

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

  Update: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const { title, content } = req.body;
      const result = await board.updatePost(decoded.id, { title, content });

      if (result[0] > 0)
        return res.status(200).json({ message: "Post updated successfully" });
      else res.status(404).json({ error: "Post not found" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
