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
    console.log(searchname)
    const prod = await ProductShoes.findOne({name: searchname});
    if (!prod){
        return { error: "Produto não encontrado" };
    }
    await ProductShoes.deleteOne({ name: searchname });
    return { message: "deu certo poha"};
    } catch (error) {
        throw error;
    }
};

const updateProductShoesStock = async (shoes: string) => {
    try { 
        const searchname =  shoes; 
        // objeto para decrementar o estoque
        const updateQuery = {
            $inc: {
              stock: -1
            }
          };
        const options =  {new: true };

    const productfinded = await ProductShoes.findOneAndUpdate({name: searchname }, updateQuery, options);
    if (!productfinded) {
        // Lidar com o caso de não encontrar o documento
        return { error: "Produto não encontrado ou estoque já está em 0." };
    } else {
        return productfinded;
    }
    } catch(error) {
        throw error
    }
};
export default{ createProductShoes, getProductsShoes, deleteProductShoes, updateProductShoesStock};