"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updatePassword = async (user, password) => {
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        const newpassword = await bcryptjs_1.default.hash(password, salt);
        const results = await user_1.default.findOneAndUpdate({ name: user.name }, { $set: { password: newpassword } }, { new: true });
        if (!results)
            throw new Error('user not found');
        return results;
    }
    catch (error) {
        return error;
    }
    ;
};
exports.default = { updatePassword };
