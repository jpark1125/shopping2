const { Board } = require("../models");
const { Op } = require("sequelize");

class B {}

B.prototype.createPost = async function ({ title, content, image, userId }) {
  return await Board.create({ title, content, image, userId });
};

B.prototype.deletePost = async function (postId) {
  return await Board.destroy({ where: { id: postId } });
};

// B.prototype.getAllPosts = async function () {
//   return await Board.findAll();
// };
B.prototype.getAllPosts = async function () {
  const posts = await Board.findAll({
    attributes: ["id", "title", "images"],
  });

  const modifiedPosts = posts.map((post) => {
    const firstImage =
      post.images && post.images.length > 0 ? post.images[0] : null;

    return {
      id: post.id,
      title: post.title,
      image: firstImage,
    };
  });
  return modifiedPosts;
};

B.prototype.getPostById = async function (postId) {
  const post = await Board.findByPk(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

B.prototype.searchPosts = async function ({ title, content }) {
  return await Board.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${title}%` } },
        { content: { [Op.like]: `%${content}%` } },
      ],
    },
  });
};

B.prototype.updatePost = async function (postId, { title, content }) {
  return await Board.update({ title, content }, { where: { id: postId } });
};

module.exports = B;
