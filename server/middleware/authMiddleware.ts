import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export const authenticateUser = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      const user = await User.findById((decoded as any)._id);
      if (!user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
        return;
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.error("JWT Verification Error:", jwtError.message);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Unauthorized: Unexpected error" });
  }
};