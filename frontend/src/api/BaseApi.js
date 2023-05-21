import axiosInstance from './AxiosInstance';

const HttpMethods = {
    Get : 'get',
    Post : 'post',
    Put : 'put',
    Delete : 'delete',
    Patch : 'patch',
}

export default class BaseApi {
    async getAsync(
        endPoint,
        queryStringParameters,
    ) {
        return await this.executeAsync(HttpMethods.Get, endPoint, queryStringParameters, undefined);
    }

    async postAsync(
        endPoint,
        queryStringParameters,
        data,
    ) {
        return await this.executeAsync(HttpMethods.Post, endPoint, queryStringParameters, data);
    }

    async putAsync(
        endPoint,
        queryStringParameters,
        data,
    ) {
        return await this.executeAsync(HttpMethods.Put, endPoint, queryStringParameters, data);
    }

    async patchAsync(
        endPoint,
        queryStringParameters,
        data,
    ) {
        return await this.executeAsync(HttpMethods.Patch, endPoint, queryStringParameters, data)
    }

    async deleteAsync(
        endPoint,
        queryStringParameters,
        data,
    ) {
        return await this.executeAsync(HttpMethods.Delete, endPoint, queryStringParameters, data);
    }

    async executeAsync(
        method,
        endPoint,
        queryStringParameters,
        data,
    ) {
        return (await axiosInstance.request({
            method: method,
            url: endPoint,
            params: queryStringParameters,
            data: data,
        })).data;
    }
}
