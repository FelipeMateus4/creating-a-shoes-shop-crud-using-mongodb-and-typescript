"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const shoesController_1 = require("./controller/shoesController");
const socksController_1 = require("./controller/socksController");
const authController_1 = require("./controller/authController");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/thundershoes", shoesController_1.shoesController);
router.use("/thundersocks", socksController_1.socksController);
// para o registro
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.authenticateUser);
router.post("/logout", authController_1.logoutUser);
