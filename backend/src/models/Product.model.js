const {
    Model
} = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class ProductModel extends Model {
        
    }

    ProductModel.init({
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull:false,
            defaultValue:0
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
        },
        discountPrice: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.price * ((100-this.discount)/100);
            }
        }
    },{
        sequelize,
        modelName: 'Product'
    })

    return ProductModel;
}