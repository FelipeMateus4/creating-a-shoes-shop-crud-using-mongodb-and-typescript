import userloginservices from "../services/userloginservices";
import { CreateUsersType } from "../types/userTypes";
import bcrypt from 'bcryptjs';
import User from "../models/user";
import { Router } from "express";
import { Request, Response } from "express";

const router =  Router();

router.put('/', async (req: Request, res: Response) => {
    try {
        const { email, password, newPassword, confirmatePassword } = req.body;

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        
        if (isPasswordValid && newPassword === confirmatePassword) {
            await userloginservices.updatePassword(user, newPassword);
            return res.status(200).send({ message: "Password updated" });
        } else {
            return res.status(400).send({ message: "Invalid current password or passwords do not match" });
        }
     
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
});

export { router as userloginController };