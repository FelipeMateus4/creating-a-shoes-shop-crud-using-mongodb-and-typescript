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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Cookies:', req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const user = yield user_1.default.findById(decoded.userId);
        if (!user || !user.verify) {
            return res.status(401).json({ message: 'Access Denied: User not verified or not found' });
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
});
exports.authenticateToken = authenticateToken;
