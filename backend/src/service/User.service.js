const { AppError, HttpCode } = require("../exceptions/AppError");
const db = require("../models");
const { sign } = require("../utils/JWT.utils");
const BaseService = require("./BaseService");
const bcrypt = require("bcrypt");

const UserModel = db.User;

class UserServiceImpl {
    baseService = new BaseService(UserModel);

    async login(email, password){
        const user = await this.validatePassword(email, password);
        
        const accessToken = sign({
            userId:user.id,
            role: user.role
        },{
            expiresIn:"1440m"
        })

        return {accessToken, user};
    }

    async validatePassword(email, password){
        const user = await this.baseService.findOne({
            email
        })
        if(!user){
            throw new AppError({
                httpCode:HttpCode.NOT_FOUND,
                description:"User not found"
            })
        }
        const isValid = await this.comparePassword(user.password, password);
        if(!isValid){
            throw new AppError({
                httpCode:HttpCode.BAD_REQUEST,
                description:"Password not matched"
            })
        }
        return user;
    }

    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hashSync(password, salt);
        return hash;
    }

    async comparePassword (password , check_password) {
        return await bcrypt.compare(check_password, password);
    }
}

const UserService = new UserServiceImpl();

module.exports = UserService;