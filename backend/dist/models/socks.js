"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSocks = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    material: { type: String, required: true },
    url: { type: String, required: true },
    height: { type: String, required: true },
    stock: { type: Number, required: true },
});
const Product = (0, mongoose_1.model)('Productsocks', productSchema, 'meias');
exports.ProductSocks = Product;
