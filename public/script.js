// Delete Article
const btnDelete = document.querySelector("#delete")
const articleId = btnDelete.getAttribute("data-deleteArticle")
btnDelete.addEventListener("click", (e) => {
    const result = confirm('are you sure to delete this article')
    if (result) {
        fetch(`/user/myArticles/${articleId}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => window.location.href = data.articlesLink)
            .catch((err) => { console.log(err); })
    }
})