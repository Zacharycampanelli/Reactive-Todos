import express from "express";
import {
  register,
  login,
  forgottenPassword,
  resetPassword,
  getUser,
} from "../controllers/UserController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(register);
router.route("/user").get(authenticateUser, getUser);
router.route("/login").post(login);
router.route("/forgot").post(forgottenPassword);
router.route("/reset/:token").post(resetPassword);
export default router;
