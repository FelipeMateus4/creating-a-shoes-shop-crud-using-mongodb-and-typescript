import User, { IUser } from "../models/user";
import { CreateUsersType } from "../types/userTypes";
import bcrypt from 'bcryptjs';


const updatePassword = async (user: CreateUsersType, password: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const newpassword = await bcrypt.hash( password, salt)
        const results = await User.findOneAndUpdate(
            { name: user.name},
            { $set: {password: newpassword} },
            {new: true});

        if(!results)
            throw new Error('user not found')

        return results
    } catch (error) {
        return error
    };
}

export default{ updatePassword };