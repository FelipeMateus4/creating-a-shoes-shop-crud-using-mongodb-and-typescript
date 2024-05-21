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
const shoes_1 = require("../models/shoes");
const createProductShoes = (shoe) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newshoes = new shoes_1.ProductShoes(shoe);
        yield newshoes.save();
        return newshoes;
    }
    catch (error) {
        throw (error);
    }
});
const getProductsShoesAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield shoes_1.ProductShoes.find({});
        return products;
    }
    catch (error) {
        throw error;
    }
});
const getProductsShoes = (shoe) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchname = shoe;
        const findedproduct = yield shoes_1.ProductShoes.findOne({ name: searchname });
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
});
const deleteProductShoes = (shoes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchname = shoes;
        const prod = yield shoes_1.ProductShoes.findOne({ name: searchname });
        if (!prod) {
            return { error: "Produto não encontrado para ser deletado" };
        }
        yield shoes_1.ProductShoes.deleteOne({ name: searchname });
        return { message: "deu certo poha" };
    }
    catch (error) {
        throw error;
    }
});
const updateProductShoesStock = (shoes, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchname = shoes;
        const updateQuery = {
            $inc: {
                stock: -amount
            }
        };
        const options = { new: true };
        const productfinded = yield shoes_1.ProductShoes.findOneAndUpdate({ name: searchname }, updateQuery, options);
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
});
const updateProcuct = (shoes, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchname = shoes;
        const options = { new: true };
        const productfinded = yield shoes_1.ProductShoes.findOneAndUpdate({ name: searchname }, update, options);
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
});
exports.default = { createProductShoes, getProductsShoesAll, deleteProductShoes, updateProductShoesStock, updateProcuct, getProductsShoes };
