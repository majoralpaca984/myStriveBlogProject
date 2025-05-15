import express from "express";
import { sendEmail } from "../controllers/auth/emailController.js";


const router = express.Router();

router.post("/", sendEmail);

export default router;
