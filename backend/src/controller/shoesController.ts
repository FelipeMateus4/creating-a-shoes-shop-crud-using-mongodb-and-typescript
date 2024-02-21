import shoesServices from "../services/shoesServices";
import { CreateShoesType } from "../types/shoesTypes";
import { Router } from "express";


const router = Router();

router.post("/", async (req, res) => {
    const shoes: CreateShoesType = {
        name: req.body.name,
        gender: req.body.gender,
        size: req.body.size,
        brand: req.body.brand,
        productType: req.body.productType,
        price: req.body.price,
        color: req.body.color,
        flavor:req.body.flavor
    };
    try {
        await shoesServices.createProductShoes(shoes);
        return res.status(201).send(shoes);
    } catch (err) {
        return res.status(500).send({ message: "An error occurred while creating the product." });
    }
});

router.get("/", async (req, res) => {    
    try {
        const products = await shoesServices.getProductsShoes();
        return res.status(200).send(products);
    } catch (err) {
        return res.status(500).send({ message: "An error occurred while fetching the products." });
    }
});

router.delete("/:name", async (req, res) => {    
    try {
        const name =  req.params.name;
        const products = await shoesServices.deleteProductShoes(name)
        return res.status(200).send(products);
    } catch (err) {
        return res.status(500).send({ message: "An error occurred while fetching the products." });
    }
});

export { router as shoesController };