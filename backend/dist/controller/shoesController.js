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
exports.shoesController = void 0;
const shoesServices_1 = __importDefault(require("../services/shoesServices"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.shoesController = router;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shoes = {
        name: req.body.name,
        gender: req.body.gender,
        size: req.body.size,
        brand: req.body.brand,
        productType: req.body.productType,
        price: req.body.price,
        color: req.body.color,
        flavor: req.body.flavor,
        url: req.body.url,
        stock: req.body.stock
    };
    try {
        yield shoesServices_1.default.createProductShoes(shoes);
        return res.status(201).send(shoes);
    }
    catch (error) {
        return res.status(500).send({ message: "An error occurred while creating the product." });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield shoesServices_1.default.getProductsShoesAll();
        return res.status(200).send(products);
    }
    catch (error) {
        return res.status(500).send({ message: "An error occurred while fetching the products." });
    }
}));
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const findproduct = yield shoesServices_1.default.getProductsShoes(name);
        return res.status(200).send(findproduct);
    }
    catch (error) {
        return res.status(404).send({ message: "An error occurred while fetching the products." });
    }
}));
router.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const namedeleted = yield shoesServices_1.default.deleteProductShoes(name);
        return res.status(200).send(namedeleted);
    }
    catch (error) {
        return res.status(404).send({ message: "An error occurred while fetching the products." });
    }
}));
router.patch("/:name/:amount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const amountItems = parseInt(req.params.amount, 10);
        const nameupdated = yield shoesServices_1.default.updateProductShoesStock(name, amountItems);
        return res.status(200).send(nameupdated);
    }
    catch (error) {
        return res.status(500).send({ mesage: "erro na atualizacao dos dados" });
    }
}));
router.put("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchname = req.params.name;
    try {
        const updatedshoes = {
            name: req.body.name,
            gender: req.body.gender,
            size: req.body.size,
            brand: req.body.brand,
            productType: req.body.productType,
            price: req.body.price,
            color: req.body.color,
            flavor: req.body.flavor,
            url: req.body.url,
            stock: req.body.stock
        };
        const nameshoesupdated = yield shoesServices_1.default.updateProcuct(searchname, updatedshoes);
        return res.status(200).send(nameshoesupdated);
    }
    catch (error) {
        return res.status(500).send({ mesage: "erro na atualizacao dos dados" });
    }
}));
