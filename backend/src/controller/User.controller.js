const { AppError, HttpCode } = require("../exceptions/AppError");
const { errorHandler } = require("../exceptions/ErrorHandler");
const UserService = require("../service/User.service");
const {Op} = require("sequelize");

const getCurrentUserDetailHandler = async (req, res) => {
    try{
        const userId = req.userId;
        const user = await UserService.baseService.getById(userId);
        return res.json({user});
    }catch(error){
        errorHandler.handleError(error, res);
    }
}

const createUserHandler = async (req, res) => {
    try{
        const data = req.body;
        const exUser = await UserService.baseService.findOne({
            email:data.email
        })
        if(exUser){
            throw new AppError({
                httpCode:HttpCode.ALREADY_EXISTS,
                description:"User already exist"
            })
        }
        data.password = await UserService.hashPassword(data.password);
        const user = await UserService.baseService.create(data);
        return res.json(user);
    }catch(error){
        errorHandler.handleError(error, res);
    }
}

const loginHandler = async (req, res) => {
    try{
        const data = req.body;
        const authResponse = await UserService.login(data.email, data.password);
        return res.json(authResponse);

    }catch(error){
        errorHandler.handleError(error, res);
    }
}

const updateUserHandler = async (req, res) => {
    try{
        const data = req.body;
        if(data.password){
            data.password = await UserService.hashPassword(data.password);
        }else{
            delete data.password
        }
        const user = await UserService.baseService.update(data.id, data);
        return res.json(user);
    }catch(error){
        errorHandler.handleError(error, res);
    }
}

const getUsersHandler = async (req, res) => {
    try{
        const queryParams = req.query;
        const where = {}
        const include = []

        if(queryParams.role){
            where["role"] = queryParams.role;
        }

        if(queryParams.search){
            where[Op.or]=[
                {
                    name: {
                        [Op.iLike]: `%${queryParams.search}%`
                    }
                },
                {
                    email: {
                        [Op.iLike]: `%${queryParams.search}%`
                    }
                },
                {
                    phone: {
                        [Op.iLike]: `%${queryParams.search}%`
                    }
                }
            ]
        }

        const data = await UserService.baseService.list(
            queryParams.page,
            queryParams.limit,
            where,
            [["createdAt", queryParams.order||"DESC"]],
            undefined,
            include
        )

        return res.json(data);

    }catch(error){
        errorHandler.handleError(error, res);
    }
}

const getUserHandler = async(req, res) => {
    try{
        const userId = req.params.userId;

        const data = await UserService.baseService.getById(userId);
        return res.json(data);
    }catch(error){
        errorHandler.handleError(error, res);
    }
}

module.exports = {
    createUserHandler, 
    loginHandler,
    updateUserHandler,
    getUsersHandler,
    getCurrentUserDetailHandler,
    getUserHandler
}
