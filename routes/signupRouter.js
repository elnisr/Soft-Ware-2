import { Router } from "express";
import { createUser, signupPage } from "../controllers/login.js";

const router = Router();
router.get('/', signupPage)
router.post('/', createUser)

export default router