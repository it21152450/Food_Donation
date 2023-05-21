const { AppError, HttpCode } = require("../exceptions/AppError");
const { errorHandler } = require("../exceptions/ErrorHandler");
const DonationService = require("../service/Donation.service");
const {Op} = require("sequelize");

const getDonationsHandler = async (req, res) => {
    try {
        const userId = req.userId;
        const queryParams = req.query;
        const where = {}
        const include = []

        if (queryParams.expandUser === 'true') {
            include.push({
                association: "user"
            })
        }

        if (queryParams.expandManageByUser === 'true') {
            include.push({
                association: "manageByUser"
            })
        }

        if (queryParams.expandDonationItems === 'true') {
            include.push({
                association: "donationItems"
            })
        }

        if (queryParams.myDonations === 'true') {
            where["userId"] = userId
        }

        if(queryParams.assignedToMe === 'true') {
            where["manageByUserId"] = userId
        }

        if(queryParams.notAssigned === 'true') {
            where["manageByUserId"] = {
                [Op.eq] : null
            }
        }

        if (queryParams.status) {
            where["status"] = queryParams.status
        }

        const data = await DonationService.baseService.list(
            queryParams.page,
            queryParams.limit,
            where,
            [["createdAt", queryParams.order||"DESC"]],
            undefined,
            include
        )
        return res.json(data);
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

const getDonationHandler = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const queryParams = req.query;
        const include = []

        if (queryParams.expandUser === 'true') {
            include.push({
                association: "user"
            })
        }

        if (queryParams.expandManageByUser === 'true') {
            include.push({
                association: "manageByUser"
            })
        }

        if (queryParams.expandDonationItems === 'true') {
            include.push({
                association: "donationItems"
            })
        }

        const data = await DonationService.baseService.getById(donationId,
            undefined, include)
        
        if(!data){
            throw new AppError({
                httpCode:HttpCode.NOT_FOUND,
                description:"Donation not found"
            })
        }

        return res.json(data);
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

const createOrUpdateDonationHandler = async (req, res) => {
    try {
        const userId = req.userId;
        const data = req.body;
        if (!data.userId) {
            data.userId = userId;
        }
        const donation = await DonationService.createOrUpdate(data);

        return res.json(donation);
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

const deleteDonationHandler = async (req, res) => {
    try{
        const donationId = req.params.donationId;
        await DonationService.baseService.delete(donationId);
        return res.json({success:true})
    } catch (error) {
        errorHandler.handleError(error, res);
    }
}

module.exports = {
    getDonationsHandler,
    getDonationHandler,
    createOrUpdateDonationHandler,
    deleteDonationHandler
}