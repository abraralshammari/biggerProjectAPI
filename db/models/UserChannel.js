module.exports = (sequelize, DataTypes) => {
  const UserChannel = sequelize.define("UserChannel", {
    userId: {
      type: DataTypes.BOOLEAN,
    },
    // adminUserId: {
    //   type: DataTypes.BOOLEAN,
    // },
    channelId: {
      type: DataTypes.BOOLEAN,
    },
  });
  return UserChannel;
};
