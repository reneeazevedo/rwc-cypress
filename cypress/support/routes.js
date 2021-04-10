class Routes{
    as = {
        postArticles: 'POSTArticles',
        getArticlesTitle: 'GETArticlesTitle',
        getArticlesTitleComments:  'GETArticlesTitleComments'
    }
    init(){
        cy.server()
        cy.route('POST', '**/api/articles').as(this.as.postArticles)
        cy.route('GET', '**api/articles/1-**').as(this.as.getArticlesTitle)
        cy.route('GET', '**api/articles/1-**/comments').as(this.as.getArticlesTitleComments)
    }
}
export default new Routes();
