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
exports.getUserProfile = exports.verify = exports.logoutUser = exports.authenticateUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../utils/auth");
const emailoptions_1 = require("../utils/emailoptions");
const crypto_1 = __importDefault(require("crypto"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = yield user_1.default.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "The user already exists" });
    }
    const user = yield user_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        const userId = user._id;
        (0, auth_1.generateToken)(res, userId);
        res.status(201).json({
            id: userId,
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(400).json({ message: "An error occurred in creating the user" });
    }
});
exports.registerUser = registerUser;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (user && (yield user.comparePassword(password))) {
        const userId = user._id;
        (0, auth_1.generateToken)(res, userId);
        const token = crypto_1.default.randomBytes(10).toString('hex');
        yield (0, emailoptions_1.sendTokenEmail)(email, token);
        user.token = token;
        yield user.save();
        res.status(201).json({ message: "please, verify your email" });
    }
    else {
        res.status(401).json({ message: "User not found / password incorrect" });
    }
});
exports.authenticateUser = authenticateUser;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (user && user.token === token) {
        user.token = "";
        user.verify = true;
        user.save();
        (0, auth_1.generateToken)(res, user._id);
        res.status(200).json({ message: "login efetuado" });
    }
    else {
        res.status(401).json({ message: "User not found / toeken incorrect" });
    }
});
exports.verify = verify;
const logoutUser = (req, res) => {
    (0, auth_1.clearToken)(res);
    res.status(200).json({ message: "User logged out" });
};
exports.logoutUser = logoutUser;
const getUserProfile = (req, res) => {
    const user = res.locals.user; // Acessa os dados do usuário autenticado
    res.status(200).json({ message: 'This is the user profile.', user });
};
exports.getUserProfile = getUserProfile;
