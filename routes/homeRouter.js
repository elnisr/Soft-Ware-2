import { Router } from "express";
import { home } from "../controllers/home.js";
const router = new Router()
router.get('/', home)

export default router;