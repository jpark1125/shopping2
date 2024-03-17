const util = require("../utils");
const db = require("../models");
const client = require("../middleware/index");
class B {}
// constructor(BoardModel) {
//   this.Board = BoardModel;
// }

B.prototype.createPost = async (title, content, image, userId) => {
  return await this.Board.create({ title, content, image, userId });
};

B.prototype.deletePost = async (postId) => {
  return await this.Board.destroy({ where: { id: postId } });
};

B.prototype.getAllPosts = async () => {
  return await this.Board.findAll();
};

B.prototype.searchPosts = async ({ title, content }) => {
  return await this.Board.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${title}%` } },
        { content: { [Op.like]: `%${content}%` } },
      ],
    },
  });
};

B.prototype.updatePost = async (postId, { title, content }) => {
  return await this.Board.update({ title, content }, { where: { id: postId } });
};

module.exports = B;
