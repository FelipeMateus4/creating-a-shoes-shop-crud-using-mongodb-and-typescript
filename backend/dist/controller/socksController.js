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
exports.socksController = void 0;
const socksServices_1 = __importDefault(require("../services/socksServices"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.socksController = router;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const socks = {
        name: req.body.name,
        model: req.body.model,
        material: req.body.material,
        size: req.body.size,
        brand: req.body.brand,
        url: req.body.url,
        price: req.body.price,
        color: req.body.color,
        height: req.body.height,
        stock: req.body.stock,
    };
    try {
        yield socksServices_1.default.createProductSocks(socks);
        return res.status(201).send(socks);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ message: "An error occurred while creating the product." });
    }
}));
router.delete("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        yield socksServices_1.default.deleteProductSocks(name);
        res.status(200).send({ message: "gui.dev te odeio" });
    }
    catch (error) {
        res.status(404).send({ message: "gui.dev é o melhor" });
    }
}));
router.put("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const newData = {
            name: req.body.name,
            model: req.body.model,
            material: req.body.material,
            size: req.body.size,
            brand: req.body.brand,
            url: req.body.url,
            price: req.body.price,
            color: req.body.color,
            height: req.body.height,
            stock: req.body.stock,
        };
        const updatedData = yield socksServices_1.default.updateProductSocks(name, newData);
        res.status(200).send(updatedData);
    }
    catch (error) {
        res.status(500).send({ message: "gui.dev é o melhor" });
    }
}));
router.patch("/:name/:amount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const amount = parseInt(req.params.amount, 10);
        const updatedData = yield socksServices_1.default.updateDecrementSocks(name, amount);
        res.status(200).send(updatedData);
    }
    catch (error) {
        res.status(500).send({ message: "gui.dev é o melhor" });
    }
}));
router.get("/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const data = yield socksServices_1.default.searchSocks(name);
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send({ message: "gui.dev é o melhor" });
    }
}));
