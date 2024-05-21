"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const socksSchema = zod_1.z.object({
    name: zod_1.z.string(),
    model: zod_1.z.string(),
    color: zod_1.z.string(),
    size: zod_1.z.number(),
    brand: zod_1.z.string(),
    price: zod_1.z.number(),
    material: zod_1.z.string(),
    url: zod_1.z.string(),
    height: zod_1.z.string(),
    stock: zod_1.z.number(),
});
