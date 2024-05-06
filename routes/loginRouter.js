import { Router } from "express";
import { login, loginPage } from "../controllers/login.js";

const router = Router()

router.get('/', loginPage)
router.post('/',login)

export default router