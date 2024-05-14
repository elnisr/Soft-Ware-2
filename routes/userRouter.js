import { Router } from "express";
import { addArticlePage, deleteArticle, saveArticle, updateArticle, updateArticlePage, userArticlePage, userArticlesPage } from "../controllers/articles.js";

const router = new Router();

router.get('/myArticles', userArticlesPage)

router.get('/addArticle', addArticlePage)
router.post('/addArticle', saveArticle)

router.get('/myArticles/:_id', userArticlePage)
router.delete('/myArticles/:_id', deleteArticle)
router.get('/myArticles/:_id/updateArticle', updateArticlePage)
router.put('/myArticles/:_id', updateArticle)
export default router