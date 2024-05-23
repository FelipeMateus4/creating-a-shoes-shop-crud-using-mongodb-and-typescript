"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userloginController = void 0;
const userloginservices_1 = __importDefault(require("../services/userloginservices"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userloginController = router;
router.put('/password', async (req, res) => {
    try {
        const { email, password, newPassword, confirmatePassword } = req.body;
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        console.log(isPasswordValid);
        if (isPasswordValid && newPassword === confirmatePassword) {
            await userloginservices_1.default.updatePassword(user, newPassword);
            return res.status(200).send({ message: "Password updated" });
        }
        else {
            return res.status(400).send({ message: "Invalid current password or passwords do not match" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});
