const { Board } = require("../models");
const { Op } = require("sequelize");

class B {}

B.prototype.createPost = async (id, title, content, image, userId) => {
  console.log("userId", id, title, content, image, userId);
  const imagePath = image.join(",");
  console.log("userId", id, title, content, imagePath, userId);
  return await Board.create({ id, title, content, image: imagePath, userId });
};

B.prototype.deletePost = async (id) => {
  return await Board.destroy({ where: { id: id } });
};

// B.prototype.getAllPosts = async () {
//   return await Board.findAll();
// };
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

B.prototype.updatePost = async (id, { title, content }) => {
  return await Board.update({ title, content }, { where: { id: id } });
};

module.exports = B;
