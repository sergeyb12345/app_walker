import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {ArticleService} from '../../../services/article-service';

@inject(EventAggregator, ArticleService, "User")
export class Article {
    @bindable article;

    constructor (eventAggregator, articleService, userContext) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.articleService = articleService;
        this.subscriptions = [];
        this.editMode = false;
        this.article = {};
    }

    articleChanged(article) {
        if (article && article.articleId) {
            this.article = article;
            this.subscribe();
            this.setEditMode(false);
        }
    }  

    sort(article) {
        if (article && article.blocks) {
            let sortedBlocks = article.blocks
                .filter(function(item) {
                    return item.deleted !== true;
                })
                .slice(0)
                .sort((a, b) => {
                    return (a['orderId'] - b['orderId']);
                });
            article.blocks = sortedBlocks;
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
                    this.eventAggregator.publish('article-saved-' + response.articleId, true);
                    this.setEditMode(false);
                })
                .catch(error => {
                    this.eventAggregator.publish('article-saved-' + response.articleId, false);
                });
        } else {
            alert("Some block are in edit mode. Apply changes to those blocks first.");
        }
    }


    setEditMode (editMode) {
        if (this.article &&  this.article.articleId) {
            this.editMode = editMode;

            this.article.blocks.forEach(function(block) {
                block.editMode = editMode;
                if (editMode !== true) {
                    block.isEditing = false;
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
    }

    moveBlockUp(block) {
        let order = block.orderId - 1;
        let up = this.article.blocks.find(x => x.orderId === order);
        if(up && up.orderId === order) {
            up.orderId = block.orderId;
            block.orderId = order;

            this.sort(this.article);
        }
    }

    moveBlockDown(block) {
        let order = block.orderId + 1;
        let down = this.article.blocks.find(x => x.orderId === order);
        if(down && down.orderId === order) {
            down.orderId = block.orderId;
            block.orderId = order;

            this.sort(this.article);
        }
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

    subscribe() {
        this.unsubscribe();

        if (this.article && this.article.articleId) {

            this.subscriptions.push(
                this.eventAggregator.subscribe('start-edit-article-' + this.article.articleId, flag => this.startEdit(flag)));

            this.subscriptions.push(
                this.eventAggregator.subscribe('cancel-edit-article-' + this.article.articleId, flag => this.cancelEdit(flag)));

            this.subscriptions.push(
                this.eventAggregator.subscribe('save-article-' + this.article.articleId, flag => this.saveArticle(flag)));

            this.subscriptions.push(
                this.eventAggregator.subscribe('move-block-up', block => this.moveBlockUp(block)));

            this.subscriptions.push(
                this.eventAggregator.subscribe('move-block-down', block => this.moveBlockDown(block)));

            this.subscriptions.push(
                this.eventAggregator.subscribe('delete-block', block => this.sort()));
        }
    }

    detached() {
        this.unsubscribe();
    }
    
    unsubscribe() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }
}