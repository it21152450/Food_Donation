const express = require("express");
const { createUserHandler, loginHandler, updateUserHandler, getUsersHandler, getCurrentUserDetailHandler, getUserHandler } = require("../controller/User.controller");

const UserRoutes = express.Router();

UserRoutes.get("/", getUsersHandler);
UserRoutes.post("/", createUserHandler);
UserRoutes.patch("/", updateUserHandler);
UserRoutes.post("/login", loginHandler);
UserRoutes.get("/detail", getCurrentUserDetailHandler);
UserRoutes.get("/:userId", getUserHandler);

module.exports = UserRoutes;