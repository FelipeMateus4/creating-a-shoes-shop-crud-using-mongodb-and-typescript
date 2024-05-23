"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socks_1 = require("../models/socks");
const createProductSocks = async (sock) => {
    try {
        const newsocks = new socks_1.ProductSocks(sock);
        await newsocks.save();
        return newsocks;
    }
    catch (error) {
        throw (error);
    }
};
const deleteProductSocks = async (name) => {
    try {
        await socks_1.ProductSocks.findOneAndDelete({ name });
    }
    catch (error) {
        throw error;
    }
};
const updateProductSocks = async (name, update) => {
    try {
        const options = { new: true };
        const newData = await socks_1.ProductSocks.findOneAndUpdate({ name }, update, options);
        if (!newData)
            return { error: "Não encontrado!" };
        else
            return newData;
    }
    catch (error) {
        throw error;
    }
};
const updateDecrementSocks = async (name, amount) => {
    try {
        const options = { new: true };
        const decrement = {
            $inc: {
                stock: -amount
            }
        };
        const newData = await socks_1.ProductSocks.findOneAndUpdate({ name }, decrement, options);
        if (!newData)
            return { error: "Não encontrado!" };
        else
            return newData;
    }
    catch (error) {
        throw error;
    }
};
const searchSocks = async (name) => {
    try {
        const data = await socks_1.ProductSocks.findOne({ name });
        if (!data)
            return { error: "Não encontrado!" };
        else
            return data;
    }
    catch (error) {
        throw error;
    }
};
exports.default = { createProductSocks,
    deleteProductSocks,
    updateProductSocks,
    updateDecrementSocks,
    searchSocks };
