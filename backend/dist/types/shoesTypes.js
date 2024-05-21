"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const shoesSchema = zod_1.z.object({
    name: zod_1.z.string(),
    gender: zod_1.z.string(),
    size: zod_1.z.number(),
    brand: zod_1.z.string(),
    productType: zod_1.z.string(),
    price: zod_1.z.number().optional(),
    color: zod_1.z.string().optional(),
    flavor: zod_1.z.string().optional(),
    url: zod_1.z.string(),
    stock: zod_1.z.number(),
});
