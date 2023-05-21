const db = require("../models");
const BaseService = require("./BaseService");

const DonationItemModel = db.DonationItem;

class DonationItemServiceImpl {
    baseService = new BaseService(DonationItemModel);
}

const DonationItemService = new DonationItemServiceImpl();

module.exports = DonationItemService;