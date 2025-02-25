import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models";

interface UserRequest extends Request {
  user?: any;
}

export const authenticateUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // Find user in database
      req.user = await User.findById(decoded._id).select("-password");

      if (!req.user) {
        res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error("🚨 Token Verification Error:", error);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
