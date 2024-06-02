import { z } from "zod";

const socksSchema = z.object ({
    name: z.string(),
    model: z.string(),
    color: z.string(),
    size: z.number(),
    brand: z.string(),
    price: z.number(),
    material: z.string(),
    url: z.string(),
    height: z.string(),
    stock: z.number(),
});

type CreateSocksType = z.infer<typeof socksSchema>;

export {CreateSocksType};
