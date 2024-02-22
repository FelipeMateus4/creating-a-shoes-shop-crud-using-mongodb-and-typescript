import { z } from "zod";

const shoesSchema = z.object({
    name: z.string(),
    gender: z.string(),
    size: z.number(),
    brand: z.string(),
    productType: z.string(),
    price: z.number().optional(),
    color: z.string().optional(),
    flavor: z.string().optional(),
    stock: z.number(),
});

type CreateShoesType = z.infer<typeof shoesSchema>;

export { CreateShoesType };    
