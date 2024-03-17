module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
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
      // price: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      tableName: "board",
      timestamps: true,
    }
  );

  return Board;
};
