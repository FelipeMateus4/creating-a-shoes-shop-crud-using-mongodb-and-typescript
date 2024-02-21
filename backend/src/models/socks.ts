import { Schema, model } from "mongoose";

interface Socks {
    id: Number;
    name: String;
    model: String;
    color: String;
    size: Number;
    brand: String;
    price: Number;
    material: String;
    url: String;
    height: String;
}

const productSchema = new Schema<Socks>({ 
    name: { type: String, required: true },
    model: {type: String, required: true },
    color: {type: String, required: true },
    size: { type: Number , required: true },
    brand: {type: String, required: true },
    price: {type: Number, required: true },
    material: {type: String, required: true },
    url: {type: String, required: true },
    height: {type: String, required: true },
 });

 const Product  = model<Socks>('Productsocks', productSchema, 'meias');

 export { Product as ProductSocks};