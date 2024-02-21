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

export default{ createProductSocks };