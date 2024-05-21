"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductShoes = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    size: { type: Number, required: true },
    brand: { type: String, required: true },
    productType: { type: String, required: true },
    price: { type: Number, required: false },
    color: { type: String, required: false },
    flavor: { type: String, required: false },
    url: { type: String, required: true },
    stock: { type: Number, required: true },
});
const Product = (0, mongoose_1.model)('Product', productSchema, 'tenis');
exports.ProductShoes = Product;
