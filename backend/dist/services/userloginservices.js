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
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updatePassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const newpassword = yield bcryptjs_1.default.hash(password, salt);
        const results = yield user_1.default.findOneAndUpdate({ name: user.name }, { $set: { password: newpassword } }, { new: true });
        if (!results)
            throw new Error('user not found');
        return results;
    }
    catch (error) {
        return error;
    }
    ;
});
const updateEmail = (user, newemail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userResult = yield user_1.default.findOneAndUpdate({ email: user.email }, { $set: { email: newemail } }, { new: true });
        if (!userResult) {
            throw new Error('user not found');
        }
        return userResult;
    }
    catch (error) {
        return error;
    }
});
exports.default = { updatePassword, updateEmail };
