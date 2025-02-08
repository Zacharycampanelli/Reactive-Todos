import { User } from "../models";
import { generateToken } from "../utils/jwtoken";
import bcrypt from 'bcrypt';

export const register = async (req: any, res: any, next: any) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ name, email, password,  });
        const token = generateToken(user._id.toString() as string);
        console.log(user, token)
        // res.cookie('token', token, { httpOnly: false, withCredentials: true });
        res.status(201).json({ message: "User logged in successfully: ", user, token });
        // next()
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}