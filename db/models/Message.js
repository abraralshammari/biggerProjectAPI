module.exports = (sequelize , DataTypes) => {
    const Message = sequelize.define("Message" , {
        text: {
            type: DataTypes.TEXT
        }
    });
    return Message;
}