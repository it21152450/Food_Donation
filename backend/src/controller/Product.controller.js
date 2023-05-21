const { AppError, HttpCode } = require("../exceptions/AppError");
const { errorHandler } = require("../exceptions/ErrorHandler");
const ProductService = require("../service/Product.service");
const {Op} = require("sequelize");

const getProductsHandler = async (req, res) => {
    try {
        const userId = req.userId;
        const queryParams = req.query;
        const where = {}
        const include = []

        const data = await ProductService.baseService.list(
            queryParams.page,
            queryParams.limit,
            where,
            undefined,
            undefined,
            include
        )
        return res.json(data);
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

const getProductHandler = async (req, res) => {
    try {
        const productId = req.params.productId;
        const queryParams = req.query;
        const include = []


        const data = await ProductService.baseService.getById(productId,
            undefined, include)
        
        if(!data){
            throw new AppError({
                httpCode:HttpCode.NOT_FOUND,
                description:"Product not found"
            })
        }

        return res.json(data);
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

const createOrUpdateProductHandler = async (req, res) => {
    try {
        const userId = req.userId;
        const data = req.body;
        if (!data.userId) {
            data.userId = userId;
        }
        const product = await ProductService.baseService.createOrUpdate(data);

        return res.json(product);
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

const deleteProductHandler = async (req, res) => {
    try{
        const productId = req.params.productId;
        await ProductService.baseService.delete(productId);
        return res.json({success:true})
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

module.exports = {
    getProductsHandler,
    getProductHandler,
    createOrUpdateProductHandler,
    deleteProductHandler
}