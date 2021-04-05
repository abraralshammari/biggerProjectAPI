module.exports = (sequalize,DataTypes) => {
    const User = sequalize.define ("User" , {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Username Already Exists"
            }
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    });
    return User;
}