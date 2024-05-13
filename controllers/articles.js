import Article from "../models/articlesSchema.js"

export const articlesPage = async (req, res) => {
    const perPage = 8; // Number of items per page
    const page = Number(req.query.page || 1); // Current page number
    const totalArticles = await Article.countDocuments();
    const totalPages = Math.ceil(totalArticles / perPage);
    await Article.find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((result) => { res.render('articles', { pageTitle: "Articles", headerTitle: "All Articles", display: "d-none", user: req.user, articles: result, currentPage: page, totalPages }) })
        .catch((err) => { console.log(err); })
}

export const userArticlesPage = async (req, res) => {
    const perPage = 8; // Number of items per page
    const page = Number(req.query.page || 1); // Current page number
    const totalArticles = await Article.countDocuments();
    const totalPages = Math.ceil(totalArticles / perPage);
    await Article.find({ user: req.user._id })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((result) => { res.render('userArticles', { pageTitle: "My Articles", headerTitle: "My Articles", display: "d-none", user: req.user, articles: result, currentPage: page, totalPages }) })
        .catch((err) => { console.log(err); })
}

export const articlePage = async (req, res) => {
    await Article.findById(req.params._id).populate('user')
        .then((result) => { res.render('article', { pageTitle: `${result.title} Article`, headerTitle: `${result.title}`, display: "d-inline-block", user: req.user, article: result }) })
}

export const userArticlePage = async (req, res) => {
    await Article.findById(req.params._id)
        .then((result) => { res.render('userArticle', { pageTitle: `${result.title} Article`, headerTitle: `${result.title}`, display: "d-inline-block", user: req.user, article: result }) })
}

export const addArticlePage = async (req, res) => {
    res.render('addArticle', { pageTitle: "Add Article", headerTitle: "Add Article", user: req.user, display: "d-none" })
}

export const updateArticlePage = async (req, res) => {
    await Article.findById(req.params._id)
        .then((result) => { res.render('updateArticle', { pageTitle: `Update ${result.title}`, headerTitle: `Update "${result.title}"`, display: "d-none", user: req.user, article: result }) })
}

export const saveArticle = async (req, res) => {
    // const article = new Article(req.body)
    // await article.save()
    const { title, details } = req.body;
    await Article.create({
        title, details, user: req.user._id
    })
        .then(() => { res.redirect('/user/myArticles') })
        .catch((err) => { console.log(err); })
}

export const deleteArticle = async (req, res) => {
    await Article.findByIdAndDelete(req.params._id)
        .then((params) => { res.json({ articlesLink: "/user/myArticles" }) })
        .catch((err) => { console.log(err); })
}

export const updateArticle = async (req, res) => {
    const { title, details } = req.body
    await Article.findByIdAndUpdate(req.params._id, { $set: { title, details } })
        .then(() => { res.redirect(`/user/myArticles/${req.params._id}`) })
        .catch((err) => { console.log(err); })
}