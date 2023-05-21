const express = require("express");
const { getDonationsHandler, createOrUpdateDonationHandler, deleteDonationHandler, getDonationHandler } = require("../controller/Donation.controller");

const DonationRoutes = express.Router();

DonationRoutes.get("/", getDonationsHandler);

DonationRoutes.post("/", createOrUpdateDonationHandler);

DonationRoutes.get("/:donationId", getDonationHandler);

DonationRoutes.delete("/:donationId", deleteDonationHandler);

module.exports = DonationRoutes;