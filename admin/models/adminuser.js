module.exports = (sequelize, DataTypes) => {
  const adminuser = sequelize.define(
    "adminuser",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
      },
      userid: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      profile: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return adminuser;
};
