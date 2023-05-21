const {
    Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class DonationModel extends Model {
        static associate(models){
            DonationModel.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
            DonationModel.belongsTo(models.User, {
                foreignKey: 'manageByUserId',
                as: 'manageByUser'
            })
            DonationModel.hasMany(models.DonationItem, {
                foreignKey: 'donationId',
                as: 'donationItems',
                onDelete: 'CASCADE'
            })
        }
    }

    DonationModel.init({
        userId:{
            type: DataTypes.INTEGER,
            references:sequelize.User,
            referencesKey:'id',
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        manageByUserId:{
            type: DataTypes.INTEGER,
            references:sequelize.User,
            referencesKey:'id',
            allowNull: true
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'new'
        },
    },{
        sequelize,
        modelName: 'Donation'
    })

    return DonationModel;
}