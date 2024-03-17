module.exports = (sequelize, DataTypes) => {
  const AdminBoard = sequelize.define(
    "AdminBoard",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "adminboard",
      timestamps: true,
    }
  );

  return AdminBoard;
};
