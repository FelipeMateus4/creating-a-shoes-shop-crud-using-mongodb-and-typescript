import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { generateToken, clearToken } from "../utils/auth";
import { sendTokenEmail } from "../utils/emailoptions";
import crypto from 'crypto';

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "The user already exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const userId = user._id as unknown as string;
    generateToken(res, userId)
    res.status(201).json({
      id: userId,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "An error occurred in creating the user" });
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const userId = user._id as unknown as string;
    generateToken(res, userId);
    const token = crypto.randomBytes(10).toString('hex')
    await sendTokenEmail(email, token);
    user.token = token;
    await user.save();
    res.status(201).json({ message: "please, verify your email"});
  }
  else {
    res.status(401).json({ message: "User not found / password incorrect" });
  }
};

const verify =  async (req: Request, res: Response) => {
    const {email, token} = req.body;
    const user = await User.findOne({ email });
    if(user && user.token===token) {
      user.token = "";
      user.verify = true;
      user.save();
      generateToken(res, user._id as string);
      res.status(200).json({message: "login efetuado"})
    }
   else {
    res.status(401).json({ message: "User not found / toeken incorrect" });
  }
};

const logoutUser = (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out" });
};

const getUserProfile = (req: Request, res: Response) => {
  const user =  res.locals.user; // Acessa os dados do usuário autenticado
  res.status(200).json({ message: 'This is the user profile.', user });
};

export { registerUser, authenticateUser, logoutUser, verify, getUserProfile};
