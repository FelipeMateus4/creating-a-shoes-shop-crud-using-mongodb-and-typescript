"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, newPassword, confirmatePassword } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        console.log(isPasswordValid);
        if (isPasswordValid && newPassword === confirmatePassword) {
            yield userloginservices_1.default.updatePassword(user, newPassword);
            return res.status(200).send({ message: "Password updated" });
        }
        else {
            return res.status(400).send({ message: "Invalid current password or passwords do not match" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
}));
