import BaseApi from "./BaseApi";

class UserApiImpl extends BaseApi {

    async getUsersAsync(params){
        return await this.getAsync("/users", params);
    }

    async createUserAsync(data){
        return await this.postAsync("/users", undefined, data);
    }

    async updateUserAsync(data){
        return await this.patchAsync("/users", undefined, data);
    }

    async loginAsync(data){
        return await this.postAsync("/users/login", undefined, data);
    }

    async getCurrentUserDetailAsync(){
        return await this.getAsync("/users/detail");
    }
    
    async getUserAsync(userId){
        return await this.getAsync(`/users/${userId}`);
    }
}

const UserApi = new UserApiImpl();

export default UserApi;