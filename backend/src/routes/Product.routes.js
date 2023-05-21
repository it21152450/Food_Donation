const express = require("express");
const { getProductsHandler, createOrUpdateProductHandler, deleteProductHandler, getProductHandler } = require("../controller/Product.controller");

const ProductRoutes = express.Router();

ProductRoutes.get("/", getProductsHandler);

ProductRoutes.post("/", createOrUpdateProductHandler);

ProductRoutes.get("/:productId", getProductHandler);

ProductRoutes.delete("/:productId", deleteProductHandler);

module.exports = ProductRoutes;