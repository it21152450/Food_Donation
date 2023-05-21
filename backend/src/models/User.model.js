const {
    Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserModel extends Model{

    }

    UserModel.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue:'user'
        }
    },{
        sequelize,
        modelName: 'User'
    })

    return UserModel;
}