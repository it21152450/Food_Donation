const {
    Model
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class DonationItemModel extends Model {
        static associate(models){
            DonationItemModel.belongsTo(models.Donation, {
                foreignKey: 'donationId',
                as: 'donation'
            })
            DonationItemModel.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            })
        }
    }

    DonationItemModel.init({
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        donationId:{
            type: DataTypes.INTEGER,
            references:sequelize.Donation,
            referencesKey:'id',
            allowNull: false
        },
        productId:{
            type: DataTypes.INTEGER,
            references:sequelize.Product,
            referencesKey:'id',
            allowNull: true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'DonationItem'
    })

    return DonationItemModel;
}