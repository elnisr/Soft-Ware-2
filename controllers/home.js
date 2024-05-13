import Articles from "../models/articlesSchema.js"

export const home = async (req, res) => {
    await Articles.find()
        .then((result) => { res.render('index', { pageTitle: "Home", headerTitle: "Home", display: "d-inline-block", articles: result, user: req.user }) })
        .catch((err) => { console.log(err); })
}