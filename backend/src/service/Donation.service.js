const db = require("../models");
const BaseService = require("./BaseService");
const DonationItemService = require("./DonationItem.service");
const {Op} = require("sequelize");
const DonationModel = db.Donation;

class DonationServiceImpl {
    baseService = new BaseService(DonationModel);

    async createOrUpdate(data){
        const donation = await this.baseService.createOrUpdate(data);
        if(data.donationItems){
            await Promise.all(data.donationItems.map(async(donationItem) => {
                await DonationItemService.baseService.createOrUpdate({...donationItem, donationId:donation.id});
            }))
        }

        if(data.deleteDonationItemIds){
            await DonationItemService.baseService.deleteMany({
                id:{
                    [Op.in]:data.deleteDonationItemIds
                }
            })
        }
        return donation;
    }
}

const DonationService = new DonationServiceImpl();

module.exports = DonationService;