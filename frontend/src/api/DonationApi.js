import BaseApi from "./BaseApi";

class DonationApiImpl extends BaseApi {

    async getDonationsAsync(params){
        return await this.getAsync("/donations", params);
    }

    async createOrUpdateDonationAsync(data){
        return await this.postAsync("/donations", undefined, data);
    }

    async getDonationAsync(id, params){
        return await this.getAsync(`/donations/${id}`, params);
    }

    async deleteDonationAsync(id){
        return await this.deleteAsync(`/donations/${id}`);
    }

}

const DonationApi = new DonationApiImpl();

export default DonationApi;