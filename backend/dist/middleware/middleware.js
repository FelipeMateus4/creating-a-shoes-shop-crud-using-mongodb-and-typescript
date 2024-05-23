"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const authenticateToken = async (req, res, next) => {
    console.log('Cookies:', req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = await user_1.default.findById(decoded.userId);
        if (!user || !user.verify) {
            return res.status(401).json({ message: 'Access Denied: User not verified or not found' });
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
exports.authenticateToken = authenticateToken;
