import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {ArticleService} from '../services/article-service';
import {Navigation} from './navigation'

@inject(EventAggregator, ArticleService, Navigation, "User")
export class Category {

    constructor (eventAggregator, articleService, navigation, userContext) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.articleService = articleService;
        this.subscriptions = [];
        this.editMode = false;
        this.navigation = navigation;
        this.article = {};
    }

    activate(params, routeconfig) {
        this.articleUrl = "default";

        if (!params.category) {
            params.category = "default";
        }
        
        if (params.article) {
            this.articleUrl = params.article;
        }

        this.loadCategory(params.category);
    }

    loadArticle(categoryId, articleUrl) {

        this.articleService.getArticleByUrl(categoryId, articleUrl)
        .then(result => {
            this.article = result;
            this.setEditMode(false);
            this.subscribe();
        });
    }

    loadArticles(categoryId) {
        this.articleService.getArticles(categoryId)
            .then(articles => {
                this.articles = articles;
                this.sortArticles();
            });
    }

    loadCategory(categoryUrl) {
        this.setEditMode(false);

        this.articleService.getCategory(categoryUrl)
            .then(category => {
                this.category = category;

                if (this.category && this.category.categoryId > 0) {
                    this.navigation.selectMenuItem(category.url);

                    this.loadArticle(this.category.categoryId, this.articleUrl);
                    this.loadArticles(this.category.categoryId);
                }
            });
    }

    getArticleUrl(article) {
        return '/' + this.navigation.section.url + '/' + this.category.url + '/' + article.url;
    }

    setEditMode (editMode) {
        this.editMode = editMode;
        this.navigation.menu.editMode = editMode;
    }

    getUrl(menuItem) {
        return '' + this.menu.section.url + '/' + menuItem.url;
    }

    
    startEdit(flag) {
        if (this.article && this.article.articleId) {
            this.eventAggregator.publish('start-edit-article-' + this.article.articleId, true);
        }

        this.setEditMode(true);
    }

    cancelEdit(flag) {
        if (this.article && this.article.articleId) {
            this.eventAggregator.publish('cancel-edit-article-' + this.article.articleId, true);
        }
 
        this.setEditMode(false);
    }

    saveArticle(flag) {

        if (this.article && this.article.articleId) {
            this.eventAggregator.publish('save-article-' + this.article.articleId, true);
        }
    }

    onArticleSaved(flag) {
        if (flag) {
            this.setEditMode(false);

            if (this.articles) {
                this.articles.forEach(function(article) {
                    if (article.changed === true) {
                        if (article.IsDeleted) {
                            self.removeArticle(article.articleId);
                        } else {
                            self.updateArticleOrder(article.articleId, article.orderId);
                        }
                    }
                });
            }
        }
    }

    addArticle() {
        this.article = {
            articleId: 0,
            categoryId: this.category.categoryId,
            isFeatured: false,
            isDeleted: false,
            title: "New Article",
            url: "new-article",
            orderId: this.maxOrderId(this.articles) + 1,
            blocks: []
        };
    }


    deleteArticle(article) {
        article.isDeleting = true;
    }

    cancelDeleteArticle(article) {
        article.isDeleting = false;
    }

    confirmDeleteArticle(article) {
        article.IsDeleted = true;
    }    
    
    removeArticle(articleId) {
        this.articleService.deleteArticle(articleId)
            .then(response => {
            });
    }

    updateArticleOrder(articleId, orderId) {
        this.articleService.updateArticleOrder(articleId, orderId)
            .then(response => {
            });
    }

    moveUpArticle(article) {
        let order = article.orderId - 1;
        let up = this.articles.find(x => x.orderId === order);
        
        if(up && up.orderId === order) {
            up.orderId = article.orderId;
            up.changed = true;
            article.orderId = order;
            article.changed = true;

            this.sortArticles();
        }
    }

    moveDownArticle(article) {
        let order = article.orderId + 1;
        let down = this.articles.find(x => x.orderId === order);
        
        if(down && down.orderId === order) {
            down.orderId = article.orderId;
            down.changed = true;
            article.orderId = order;
            article.changed = true;
        
            this.sortArticles();
        }
    }

    sortArticles() {
        if (this.articles) {
            this.sortedArticles = this.articles
                .filter(function(item) {
                    return item.isDeleted !== true;
                })
                .slice(0)
                .sort((a, b) => {
                    return (a['orderId'] - b['orderId']);
                });
        }
    }


    subscribe() {

        if (this.article && this.article.articleId) {
            this.unsubscribe();

            this.subscriptions.push(
                    this.eventAggregator.subscribe('article-saved-' + this.article.articleId, flag => this.onArticleSaved(flag)));
            
        }

    }

    unsubscribe() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }

    }

    detached() {
        this.unsubscribe();
    }
}
