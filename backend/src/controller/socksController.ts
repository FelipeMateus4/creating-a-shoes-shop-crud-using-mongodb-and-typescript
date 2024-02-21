import socksServices from "../services/socksServices";
import { CreateSocksType } from "../types/socksTypes";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    const socks: CreateSocksType = {
        name: req.body.name,
        model: req.body.model,
        material: req.body.material,
        size: req.body.size,
        brand: req.body.brand,
        url: req.body.url,
        price: req.body.price,
        color: req.body.color,
        height: req.body.height
    };
    try {
        await socksServices.createProductSocks(socks);
        return res.status(201).send(socks);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "An error occurred while creating the product." });
    }
});

export { router as socksController };