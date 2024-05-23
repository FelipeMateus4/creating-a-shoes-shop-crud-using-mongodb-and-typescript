import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Cookies:', req.cookies);
    const token = req.cookies.jwt; 

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
    }

    try {
        const secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret) as { userId: string };
        const user = await User.findById(decoded.userId);

        if (!user || !user.verify) {
        return res.status(401).json({ message: 'Access Denied: User not verified or not found' });
        }

        res.locals.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
    };

    export { authenticateToken };
