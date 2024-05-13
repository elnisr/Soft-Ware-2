import { Router } from "express";
import { articlePage, articlesPage } from "../controllers/articles.js";

const router = new Router()
router.get('/', articlesPage)
router.get('/:_id', articlePage)

export default router;