import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {ArticleService} from '../services/article-service';
import {Navigation} from './navigation'

@inject(EventAggregator, ArticleService, Navigation)
export class Category {

    constructor (eventAggregator, articleService, navigation) {

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

    sort() {
        if (this.article.blocks) {
            this.article.sortedBlocks = this.article.blocks
                .filter(function(item) {
                    return item.deleted !== true;
                })
                .slice(0)
                .sort((a, b) => {
                    return (a['orderId'] - b['orderId']);
                });
        }
    }


    loadArticle(categoryId, articleUrl) {

        this.articleService.getArticleByUrl(categoryId, articleUrl)
        .then(result => {
            this.article = result;
            this.setEditMode(false);
            this.sort();
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

        if (this.article &&  this.article != null &&  this.article.blocks &&  this.article.blocks != null) {
            this.article.blocks.forEach(function(block) {
                block.editMode = editMode;
                if (editMode !== true) {
                    block.isEditing = false;
                }
            });
        }
    }

    startEdit(flag) {
        this.originalArticle = Object.assign({}, this.article);
        this.setEditMode(true);
    }

    cancelEdit(flag) {
        this.article = this.originalArticle;
        this.setEditMode(false);
    }

    saveArticle(flag) {

        let isEditing = false;
        let self = this;


        this.article.blocks.forEach(function(block) {
            if (block.isEditing === true) {
                isEditing = true;
            }
        });

        if (isEditing !== true) {
            this.articleService.saveArticle(this.article)
                .then(response => {
                    this.setEditMode(false);
                });
        } else {
            alert("Some block are in edit mode. Apply changes to those blocks first.");
        }

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

    addBlock() {
        if (!this.article.blocks) {
            this.article.blocks = [];
        }
        
        let block = {
            isNew: true,
            BlockId: this.maxBlockId(this.article.blocks) + 1,
            OrderId: this.maxOrderId(this.article.blocks) + 1,

            Text: ''
        };

        this.article.blocks.push(block);
        this.sort();
    }

    moveBlockUp(block) {
        let order = block.orderId - 1;
        let up = this.article.blocks.find(x => x.orderId === order);
        if(up && up.orderId === order) {
            up.orderId = block.orderId;
            block.orderId = order;

            this.sort();
        }
    }

    moveBlockDown(block) {
        let order = block.orderId + 1;
        let down = this.article.blocks.find(x => x.orderId === order);
        if(down && down.orderId === order) {
            down.orderId = block.orderId;
            block.orderId = order;

            this.sort();
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

    maxOrderId(list) {
        let max = 0;
        list.forEach(function(item) {
            if (max < item.orderId) {
                max = item.orderId;
            }
        });
        return max;
    }

    maxBlockId(list) {
        let max = 0;
        list.forEach(function(item) {
            if (max < item.blockId) {
                max = item.blockId;
            }
        });
        return max;
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


    attached() {
        let moveBlockUpChannel = 'move-block-up';
        let moveBlockDownChannel = 'move-block-down';
        let blockDeletedChannel = 'delete-block';

        this.subscriptions.push(
            this.eventAggregator.subscribe(this.navigation.section.url+'-start-edit', flag => this.startEdit(flag)));

        this.subscriptions.push(
            this.eventAggregator.subscribe(this.navigation.section.url+'-cancel-edit', flag => this.cancelEdit(flag)));

        this.subscriptions.push(
            this.eventAggregator.subscribe(this.navigation.section.url+'-save-article', flag => this.saveArticle(flag)));

        this.subscriptions.push(
            this.eventAggregator.subscribe(moveBlockUpChannel, block => this.moveBlockUp(block)));

        this.subscriptions.push(
            this.eventAggregator.subscribe(moveBlockDownChannel, block => this.moveBlockDown(block)));

        this.subscriptions.push(
            this.eventAggregator.subscribe(blockDeletedChannel, block => this.sort()));
    }

    detached() {
        this.subscriptions.forEach(function (subscription) {
            subscription.dispose();
        });
    }
}
