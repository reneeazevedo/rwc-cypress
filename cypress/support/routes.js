class Routes {
    as = {
        postArticles: 'POSTArticles',
        getArticlesTitle: 'GETArticlesTitle',
        getArticlesTitleComments: 'GETArticlesTitleComments',
        postUsers: 'POSTUsers',
        getTags: 'GETTags',
        getArticlesFeed: 'GETArticlesFeed',
        postUsersLogin: 'POSTUsersLogin'
    }
    init() {
        cy.server()
        cy.route('POST', '**/api/articles').as(this.as.postArticles)
        cy.route('GET', '**api/articles/**').as(this.as.getArticlesTitle)
        cy.route('GET', '**api/articles/**/comments').as(this.as.getArticlesTitleComments)
        cy.route('POST', '**/api/users').as(this.as.postUsers)
        cy.route('POST', '**/api/users/login').as(this.as.postUsersLogin)
        cy.route('GET', '**/api/tags').as(this.as.getTags)
        cy.route('GET', '**/api/articles/feed?limit=10&offset=0').as(this.as.getArticlesFeed)



    }

}
export default new Routes();

