const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequalize, DataTypes) => {
  const Channel = sequalize.define("Channel", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      uniqe: true,
    },
    admin: {
      type: DataTypes.INTEGER,
    },
  });
  SequelizeSlugify.slugifyModel(Channel, {
    source: ["name"],
  });
  return Channel;
};
