import jwt from "jsonwebtoken";

export const generateToken = (id: string) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
