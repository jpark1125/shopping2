const { Board } = require("../models");
const { Op } = require("sequelize");

class B {}

B.prototype.getAllPosts = async () => {
  const posts = await Board.findAll({
    attributes: ["id", "title", "image"],
  });

  const modifiedPosts = posts.map((post) => {
    // 이미지 경로를 쉼표로 분할하여 배열로 변환
    const images = post.image ? post.image.split(",") : [];
    // 첫 번째 이미지만 사용하도록 수정
    const firstImage = images.length > 0 ? images[0] : null;

    return {
      id: post.id,
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
