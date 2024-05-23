"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shoes_1 = require("../models/shoes");
const createProductShoes = async (shoe) => {
    try {
        const newshoes = new shoes_1.ProductShoes(shoe);
        await newshoes.save();
        return newshoes;
    }
    catch (error) {
        throw (error);
    }
};
const getProductsShoesAll = async () => {
    try {
        const products = await shoes_1.ProductShoes.find({});
        return products;
    }
    catch (error) {
        throw error;
    }
};
const getProductsShoes = async (shoe) => {
    try {
        const searchname = shoe;
        const findedproduct = await shoes_1.ProductShoes.findOne({ name: searchname });
        if (!findedproduct) {
            return { error: "Produto não encontrado" };
        }
        else {
            return findedproduct;
        }
    }
    catch (error) {
        throw error;
    }
};
const deleteProductShoes = async (shoes) => {
    try {
        const searchname = shoes;
        const prod = await shoes_1.ProductShoes.findOne({ name: searchname });
        if (!prod) {
            return { error: "Produto não encontrado para ser deletado" };
        }
        await shoes_1.ProductShoes.deleteOne({ name: searchname });
        return { message: "deu certo poha" };
    }
    catch (error) {
        throw error;
    }
};
const updateProductShoesStock = async (shoes, amount) => {
    try {
        const searchname = shoes;
        const updateQuery = {
            $inc: {
                stock: -amount
            }
        };
        const options = { new: true };
        const productfinded = await shoes_1.ProductShoes.findOneAndUpdate({ name: searchname }, updateQuery, options);
        if (!productfinded) {
            // Lidar com o caso de não encontrar o documento
            return { error: "Produto não encontrado" };
        }
        else {
            return productfinded;
        }
    }
    catch (error) {
        throw error;
    }
};
const updateProduct = async (shoes, update) => {
    try {
        const searchname = shoes;
        const options = { new: true };
        const productfinded = await shoes_1.ProductShoes.findOneAndUpdate({ name: searchname }, update, options);
        if (!productfinded) {
            return { error: "Produto não encontrado ou estoque já está em 0." };
        }
        else {
            return productfinded;
        }
    }
    catch (error) {
        throw error;
    }
};
const getimage = async (name) => {
    try {
        const shoe = await shoes_1.ProductShoes.findOne({ name });
        if (shoe) {
            return shoe.url;
        }
        else {
            return { error: "produto nao encontrado ou nao existe" };
        }
    }
    catch (error) {
        return { message: "Internal Server Error", error: error };
    }
};
exports.default = { createProductShoes, getProductsShoesAll, deleteProductShoes, updateProductShoesStock, updateProduct, getProductsShoes, getimage };
