const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequalize,DataTypes) => {
    const Channel = sequalize.define ("Channel" , {
        name: {
            type: DataTypes.STRING
        }
        ,slug: {
            type: DataTypes.STRING,
            uniqe: true,
          } ,
        //  adminName: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    });
    SequelizeSlugify.slugifyModel(Channel, {
        source: ["name"],
      });
    return Channel;
}