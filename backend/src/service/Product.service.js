const db = require("../models");
const BaseService = require("./BaseService");

const ProductModel = db.Product;

class ProductServiceImpl {
    baseService = new BaseService(ProductModel);
}

const ProductService = new ProductServiceImpl();

module.exports = ProductService;