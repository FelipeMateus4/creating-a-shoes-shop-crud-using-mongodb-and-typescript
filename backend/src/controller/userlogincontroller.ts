import userloginservices from "../services/userloginservices";
import { CreateUsersType } from "../types/userTypes";
import bcrypt from 'bcryptjs';
import User from "../models/user";
import { Router } from "express";
import { Request, Response } from "express";
import { sendTokenEmail } from "../utils/emailoptions";
import crypto from 'crypto';

const router =  Router();

router.put('/password', async (req: Request, res: Response) => {
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
        return res.status(500).send({ message: "Internal server error" + error });
    }
});

router.post('/email/request', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
    const user =  await User.findOne({ email: email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid =  await bcrypt.compare(password, user.password); //valida a

    if (isPasswordValid) {
        const token = crypto.randomBytes(10).toString('hex')  // criptografar o token
        user.token = token;
        user.save();
        await sendTokenEmail(email, token);
            return res.status(200).send( { message: "Token has been sent to your email"})
        // verificar o email com o token para validar a troca de senha
    } else {
            return res.status(404).send( { message: "Invalid password" });
        }
    } catch (error) {
    return res.status(500).send({ message: "Internal server error" + error });
    }
});

router.put('/email/update', async(req: Request, res: Response) => {
    try {
        const { email ,token , newemail} = req.body;
        const user =  await User.findOne({ email: email});
        if (user && user.token === token) {
            user.token = "";
            await user.save();
            userloginservices.updateEmail(user, newemail);
            return res.status(200).send( { message: "email updated" });
        } else {
            return res.status(404).send({ message: "user not found"});
        }
    } catch (error) {
        return res.status(500).send ({ message: "Internal server error:" + error })
    }
});

export { router as userloginController };