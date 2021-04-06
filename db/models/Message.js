module.exports = (sequelize , DataTypes) => {
    const Message = sequelize.define("Message" , {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
    return Message;
}