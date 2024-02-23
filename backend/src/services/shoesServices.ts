import { ProductShoes } from "../models/shoes";
import { CreateShoesType} from "../types/shoesTypes";

const createProductShoes = async ( shoe: CreateShoesType ) =>{
    try {
        const newshoes = new ProductShoes(shoe)
        await newshoes.save();
        return newshoes;
    } catch (error) {
    throw (error)     
    }
};

const getProductsShoesAll = async () => { 
    try {
        const products = await ProductShoes.find({});
        return products;
    } catch (error) {
        throw error;
    }
};

const getProductsShoes = async (shoe: string) => {
    try {
        const searchname = shoe;
        const findedproduct = await ProductShoes.findOne({name: searchname});
        if (!findedproduct) {
            return { error: "Produto não encontrado" };
        } else {
            return findedproduct;
        }
    } catch (error) {
        throw error;
    }
};
const deleteProductShoes = async (shoes: string) => {
    try {  
    const searchname =  shoes;
    const prod = await ProductShoes.findOne({name: searchname});
    if (!prod){
        return { error: "Produto não encontrado para ser deletado" };
    }
    await ProductShoes.deleteOne({ name: searchname });
    return { message: "deu certo poha"};
    } catch (error) {
        throw error;
    }
};

const updateProductShoesStock = async (shoes: string, amount: number) => {
    try { 
        const searchname =  shoes; 
        
        const updateQuery = {
            $inc: {
              stock: -amount
            }
          };
        const options =  {new: true };

    const productfinded = await ProductShoes.findOneAndUpdate({name: searchname }, updateQuery, options);
    if (!productfinded) {
        // Lidar com o caso de não encontrar o documento
        return { error: "Produto não encontrado" };
    } else {
        return productfinded;
    }
    } catch(error) {
        throw error;
    }
};

const updateProcuct = async (shoes: string, update: CreateShoesType) => {
    try {
        const searchname = shoes;
        const options =  {new: true };
        const productfinded = await ProductShoes.findOneAndUpdate({name: searchname}, update, options);
        if (!productfinded) {
            return { error: "Produto não encontrado ou estoque já está em 0." };
        } else { 
            return productfinded;
        }
    } catch (error) {
        throw error
    }
}
export default{ createProductShoes, getProductsShoesAll, deleteProductShoes, updateProductShoesStock, updateProcuct, getProductsShoes};