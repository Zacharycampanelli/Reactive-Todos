import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User  from "../models/User"
export const authenticateUser = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

 
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string};
        console.log("Decoded Token", decoded);

      const user = await User.findById(decoded._id).select('-password');
      if (!user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
        return;
      }

      req.user = user;
      next();

    
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid Token" });
  }
};