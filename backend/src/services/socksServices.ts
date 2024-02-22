import { ProductSocks } from "../models/socks";
import { CreateSocksType } from "../types/socksTypes";

const createProductSocks = async ( sock: CreateSocksType ) =>{
    try {
        const newsocks = new ProductSocks(sock)
        await newsocks.save()
        return newsocks;
    } catch (error) {
    throw (error)     
    }
};

const deleteProductSocks = async (name: string) => {
    try {
        await ProductSocks.findOneAndDelete({name})
    } catch (error) {
        throw error
    }
};

const updateProductSocks = async (name: string, update: CreateSocksType) => {
    try {
        const options =  {new: true};
        const newData = await ProductSocks.findOneAndUpdate({name}, update, options)
        if(!newData)
            return {error: "Não encontrado!"}
        else
            return newData
    } catch (error) {
        throw error
    }
}




export default{ createProductSocks, deleteProductSocks, updateProductSocks}
