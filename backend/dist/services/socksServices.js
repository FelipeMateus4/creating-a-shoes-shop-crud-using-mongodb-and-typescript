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
Object.defineProperty(exports, "__esModule", { value: true });
const socks_1 = require("../models/socks");
const createProductSocks = (sock) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsocks = new socks_1.ProductSocks(sock);
        yield newsocks.save();
        return newsocks;
    }
    catch (error) {
        throw (error);
    }
});
const deleteProductSocks = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield socks_1.ProductSocks.findOneAndDelete({ name });
    }
    catch (error) {
        throw error;
    }
});
const updateProductSocks = (name, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { new: true };
        const newData = yield socks_1.ProductSocks.findOneAndUpdate({ name }, update, options);
        if (!newData)
            return { error: "Não encontrado!" };
        else
            return newData;
    }
    catch (error) {
        throw error;
    }
});
const updateDecrementSocks = (name, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { new: true };
        const decrement = {
            $inc: {
                stock: -amount
            }
        };
        const newData = yield socks_1.ProductSocks.findOneAndUpdate({ name }, decrement, options);
        if (!newData)
            return { error: "Não encontrado!" };
        else
            return newData;
    }
    catch (error) {
        throw error;
    }
});
const searchSocks = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield socks_1.ProductSocks.findOne({ name });
        if (!data)
            return { error: "Não encontrado!" };
        else
            return data;
    }
    catch (error) {
        throw error;
    }
});
exports.default = { createProductSocks,
    deleteProductSocks,
    updateProductSocks,
    updateDecrementSocks,
    searchSocks };
