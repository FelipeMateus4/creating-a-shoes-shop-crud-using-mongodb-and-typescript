import { ProductShoes } from "../models/shoes";
import shoesServices from "../services/shoesServices";
import { CreateShoesType } from "../types/shoesTypes";
import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const shoes: CreateShoesType = {
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
        await shoesServices.createProductShoes(shoes);
        return res.status(201).send(shoes);
    } catch (error) {
        return res.status(500).send({ message: "An error occurred while creating the product." });
    }
});

router.get("/", async (req: Request, res: Response) => {    
    try {
        const products = await shoesServices.getProductsShoesAll();
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ message: "An error occurred while fetching the products." });
    }
});
router.get("/:name", async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const findproduct = await shoesServices.getProductsShoes(name);
        return res.status(200).send(findproduct);
    } catch (error) {
        return res.status(404).send({ message: "An error occurred while fetching the products." });
    }
})
router.delete("/:name", async (req: Request, res: Response) => {    
    try {
        const name =  req.params.name;
        const namedeleted = await shoesServices.deleteProductShoes(name)
        return res.status(200).send(namedeleted);
    } catch (error) {
        return res.status(404).send({ message: "An error occurred while fetching the products." });
    }
});

router.patch("/:name/:amount", async (req: Request, res: Response) => {
    try { 
        const name = req.params.name;
        const amountItems = parseInt(req.params.amount, 10);
        const nameupdated = await shoesServices.updateProductShoesStock(name, amountItems);
        return res.status(200).send(nameupdated)
    } catch (error) {
        return res.status(500).send({mesage: "erro na atualizacao dos dados"});
    }
});
router.put("/:name", async (req: Request, res: Response) => {
    const searchname =  req.params.name;
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
    }
    const nameshoesupdated =  await shoesServices.updateProcuct(searchname, updatedshoes);
    return res.status(200).send(nameshoesupdated);
    } catch (error) {
        return res.status(500).send({mesage: "erro na atualizacao dos dados"});
    }
});

router.get("/image/:name", async (req: Request, res: Response) => {
    try {
        const nameshoe = req.params.name;
        const imageurl = shoesServices.getimage(nameshoe);
        if(imageurl) {
            return res.status(201).send(imageurl) 
        }
        else {
            return res.status(404).send({message: "image not found"})
        }
    } catch (error) {
        return res.status(500).send({message: "internal server error:" + error}) 
    }

})
export { router as shoesController };