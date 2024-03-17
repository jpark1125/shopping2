const { Board } = require("../models");
const { Op } = require("sequelize");
const { Users } = require("../models");
const { B } = require("../prototype");
const jwt = require("../utils/jwt");
const { sequelize, QueryTypes } = require("../models");

// const board = new B();

module.exports = {
  Post: async (req, res) => {
    try {
      const { title, content } = req.body;
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const image = "/img/" + req.files.image[0].fileName;

      const post = await boardPrototype.createPost({
        title,
        content,
        image,
        userId: decoded.id,
      });
      return res.status(200).json({ result: post });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  Delete: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const postId = req.params.id; // URL에서 게시글 ID를 받아옵니다.

      const result = await boardPrototype.deletePost(postId);
      if (result)
        return res.status(200).json({ message: "Post deleted successfully" });
      else return res.status(404).json({ message: "Post not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  Get: async (req, res) => {
    try {
      const posts = await boardPrototype.getAllPosts();
      return res.status(200).json({ result: posts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  Search: async (req, res) => {
    try {
      const { title, content } = req.query; // 검색어를 쿼리 파라미터로 받아옵니다.

      const result = await boardPrototype.searchPosts({ title, content });
      return res.status(200).json({ result: result.rows, count: result.count });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  Update: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const postId = req.params.id; // URL에서 게시글 ID를 받아옵니다.
      const { n_title, n_content } = req.body; // 새로운 제목과 내용을 요청 본문에서 받아옵니다.

      const result = await boardPrototype.updatePost(postId, {
        title: n_title,
        content: n_content,
      });
      if (result[0] > 0)
        return res.status(200).json({ message: "Post updated successfully" });
      else return res.status(404).json({ message: "Post not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
