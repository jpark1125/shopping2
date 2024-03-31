const { Board } = require("../models");
const { Op } = require("sequelize");

class B {}

B.prototype.getAllPosts = async () => {
  const posts = await Board.findAll({
    attributes: ["id", "userId", "title", "image"],
  });

  const modifiedPosts = posts.map((post) => {
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
  return modifiedPosts;
};

B.prototype.getPostById = async (id) => {
  const post = await Board.findByPk(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};

B.prototype.searchPosts = async ({ title, content }) => {
  return await Board.findAndCountAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${title}%` } },
        { content: { [Op.like]: `%${content}%` } },
      ],
    },
  });
};

module.exports = B;
