import BaseApi from "./BaseApi";

class ProductApiImpl extends BaseApi {

    async getProductsAsync(params){
        return await this.getAsync("/products", params);
    }

    async createOrUpdateProductAsync(data){
        return await this.postAsync("/products", undefined, data);
    }

    async getProductAsync(id, params){
        return await this.getAsync(`/products/${id}`, params);
    }

    async deleteProductAsync(id){
        return await this.deleteAsync(`/products/${id}`);
    }

}

const ProductApi = new ProductApiImpl();

export default ProductApi;