import { Schema, model } from "mongoose";

interface shoes {
    name: string;
    gender: string;
    size: number;
    brand: string;
    productType: string;
    price: number;
    color: string;
    flavor: string;
    stock: number;
}

const productSchema = new Schema<shoes>({ 
    name: { type: String , required: true },
    gender: {type: String, required: true },
    size: { type: Number , required: true },
    brand: {type: String, required: true },
    productType: {type: String, required: true },
    price: {type: Number, required: false },
    color: {type: String, required: false },
    flavor: {type: String, required: false },
    stock: {type: Number, required: true },
 });

 const Product  = model<shoes>('Product', productSchema, 'tenis');
 
 export{ Product as ProductShoes};