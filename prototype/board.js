const { Board } = require("../models");
const { Op } = require("sequelize");

class B {}

B.prototype.getAllPosts = async () => {
  const posts = await Board.findAll({
    attributes: ["id", "userId", "title", "image"],
  });

  const modifiedPosts = posts.map((post) => {
    const images = post.image ? post.image.split(",") : [];

    const firstImage = images.length > 0 ? images[0] : null; //3항연산자 if문으로 변경하기

    return {
      id: post.id,
      userId: userId,
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
