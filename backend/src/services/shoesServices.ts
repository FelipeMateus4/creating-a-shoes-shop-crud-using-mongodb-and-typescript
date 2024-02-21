import { ProductShoes } from "../models/shoes";
import { CreateShoesType} from "../types/shoesTypes";

const createProductShoes = async ( shoe: CreateShoesType ) =>{
    try {
        const newshoes = new ProductShoes(shoe)
        await newshoes.save()
        return newshoes;
    } catch (error) {
    throw (error)     
    }
};

const getProductsShoes = async () => {
    try {
        const products = await ProductShoes.find({});
        return products;
    } catch (error) {
        throw error;
    }
};
const deleteProductShoes = async (shoes: string) => {
    try {  
    const searchname =  shoes;
    await ProductShoes.findOne({name: searchname})
} catch (error) {
    throw error
};
    try {
    await ProductShoes.deleteOne();
    } catch (error) {
        throw error;
    }
};
export default{ createProductShoes, getProductsShoes, deleteProductShoes};