import { z } from "zod";

const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    token: z.string().optional(),
    verify: z.boolean().default(false),
});

type CreateUsersType = z.infer<typeof userSchema>;

export{ CreateUsersType };


  