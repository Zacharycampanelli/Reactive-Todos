import {
  forgottenPassword,
  getUser,
  login,
  register,
  resetPassword,
} from "../controllers/UserController";

import { authenticateUser } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();

router.route("/").post(register);
router.route("/user").get(authenticateUser, getUser);
router.route("/login").post(login);
router.route("/forgot").post(forgottenPassword);
router.route("/reset/:token").post(resetPassword);
export default router;
