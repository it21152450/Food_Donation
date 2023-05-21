const express = require("express");
const UserRoutes = require("./User.routes");
const DonationRoutes = require("./Donation.routes");
const ProductRoutes = require("./Product.routes");

const router = express.Router();

router.use("/users", UserRoutes);
router.use("/donations", DonationRoutes);
router.use("/products", ProductRoutes);

module.exports = router;
