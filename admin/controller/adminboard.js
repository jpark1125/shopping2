const { Board } = require("../models");
//const { Op } = require("sequelize");
//const { Users } = require("../models");
const { B, A } = require("../prototype");
const jwt = require("../../utils/jwt");
const shortid = require("shortid");
const { sequelize, QueryTypes } = require("../models");
const { client } = require("../../middleware");

const board = new B();

module.exports = {
  Post: async (req, res) => {
    try {
      const { title, content } = req.body;
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      let id = shortid.generate();
      let userid = decoded.id;
      console.log("userid :", userid);
      console.log("req.files: ", req.files);
      let images = [];
      if (req.files && req.files.image) {
        if (Array.isArray(req.files.image)) {
          images = req.files.image.map((file) => "/img/" + file.filename);
        }
      }
      console.log("images : ", images);

      const result = await board.createPost(id, title, content, images, userid);

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

      const postId = req.params.id;

      const post = await Board.findOne({
        where: { id: postId, userId: decoded.id },
      });
      if (!post) {
        return res
          .status(404)
          .json({ error: "Post not found or not authorized to delete" });
      }
      console.log("delete 2");
      const result = await board.deletePost(postId);

      if (result)
        return res.status(200).json({ message: "Post deleted successfully" });
      else return res.status(404).json({ error: "Post not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
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

  ChatRooms: async (req, res) => {
    try {
      const { xauth } = req.headers;
      const decoded = jwt.verifyToken(xauth);
      const adminId = decoded.id;

      let cursor = "0";
      let Adminchatroom = [];

      do {
        const reply = await client.scan(
          cursor,
          "MATCH",
          `chatRoom:*${adminId}*`,
          "COUNT",
          100
        );
        cursor = reply[0];
        Adminchatroom.push(...reply[1]);
      } while (cursor !== "0");

      const chatRoomsDetail = await Promise.all(
        Adminchatroom.map(async (chatRoomKey) => {
          const chatRoomData = await client.hgetall(chatRoomKey);
          return { key: chatRoomKey, data: chatRoomData };
        })
      );

      res.status(200).json({ chatRooms: chatRoomsDetail });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
