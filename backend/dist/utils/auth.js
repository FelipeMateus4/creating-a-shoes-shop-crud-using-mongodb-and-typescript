"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userId) => {
    const jwtSecret = process.env.JWT_SECRET || "";
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, {
        expiresIn: "1h",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
    });
    return token;
};
exports.generateToken = generateToken;
const clearToken = (res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
};
exports.clearToken = clearToken;
