"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoesController = void 0;
const shoesServices_1 = __importDefault(require("../services/shoesServices"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.shoesController = router;
router.post("/", async (req, res) => {
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
        await shoesServices_1.default.createProductShoes(shoes);
        return res.status(201).send(shoes);
    }
    catch (error) {
        return res.status(500).send({ message: "An error occurred while creating the product." });
    }
});
router.get("/", async (req, res) => {
    try {
        const products = await shoesServices_1.default.getProductsShoesAll();
        return res.status(200).send(products);
    }
    catch (error) {
        return res.status(500).send({ message: "An error occurred while fetching the products." });
    }
});
router.get("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const findproduct = await shoesServices_1.default.getProductsShoes(name);
        return res.status(200).send(findproduct);
    }
    catch (error) {
        return res.status(404).send({ message: "An error occurred while fetching the products." });
    }
});
router.delete("/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const namedeleted = await shoesServices_1.default.deleteProductShoes(name);
        return res.status(200).send(namedeleted);
    }
    catch (error) {
        return res.status(404).send({ message: "An error occurred while fetching the products." });
    }
});
router.patch("/:name/:amount", async (req, res) => {
    try {
        const name = req.params.name;
        const amountItems = parseInt(req.params.amount, 10);
        const nameupdated = await shoesServices_1.default.updateProductShoesStock(name, amountItems);
        return res.status(200).send(nameupdated);
    }
    catch (error) {
        return res.status(500).send({ mesage: "erro na atualizacao dos dados" });
    }
});
router.put("/:name", async (req, res) => {
    const searchname = req.params.name;
    try {
        const updatedFields = {};
        // Popula updatedFields apenas com os campos presentes no corpo da requisição
        for (const key of Object.keys(req.body)) {
            updatedFields[key] = req.body[key];
        }
        const nameshoesupdated = await shoesServices_1.default.updateProduct(searchname, updatedFields);
        if (nameshoesupdated) {
            return res.status(200).send(nameshoesupdated);
        }
        else {
            return res.status(404).send({ message: "Product not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Error updating product", error: error });
    }
});
router.get("/image/:name", async (req, res) => {
    try {
        const nameshoe = req.params.name;
        const imageurl = await shoesServices_1.default.getimage(nameshoe);
        console.log(imageurl);
        if (imageurl) {
            return res.status(201).send(imageurl);
        }
        else {
            return res.status(404).send({ message: "image not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "internal server error:" + error });
    }
});
