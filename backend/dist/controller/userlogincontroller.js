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
const emailoptions_1 = require("../utils/emailoptions");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
exports.userloginController = router;
router.put('/password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.status(500).send({ message: "Internal server error" + error });
    }
}));
router.post('/email/request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password); //valida a
        if (isPasswordValid) {
            const token = crypto_1.default.randomBytes(10).toString('hex'); // criptografar o token
            user.token = token;
            user.save();
            yield (0, emailoptions_1.sendTokenEmail)(email, token);
            return res.status(200).send({ message: "Token has been sent to your" });
            // verificar o email com o token para validar a troca de senha
        }
        else {
            return res.status(404).send({ message: "Invalid password" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal server error" + error });
    }
}));
router.put('/email/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token, newemail } = req.body;
        const user = yield user_1.default.findOne({ email: email });
        if (user && user.token === token) {
            user.token = "";
            yield user.save();
            userloginservices_1.default.updateEmail(user, newemail);
            return res.status(200).send({ message: "email updated" });
        }
        else {
            return res.status(404).send({ message: "user not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Internal server error:" + error });
    }
}));
router.put('/remove/user', (req, Res) => {
});
