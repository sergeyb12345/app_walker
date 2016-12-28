import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {ArticleService} from '../services/article-service';
import {Navigation} from './navigation'
import articleEvents from  "../resources/elements/article-parts/article-events";
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation";
import {BootstrapFormRenderer} from "../common/bootstrap-form-renderer";

@inject(EventAggregator, ArticleService, Navigation, "User", ValidationController)
export class Study {

    constructor (eventAggregator, articleService, navigation, userContext, validation) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.articleEvents = articleEvents;

        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());

        this.articleService = articleService;
        this.subscriptions = [];
        this.editMode = false;
        this.navigation = navigation;
        this.article = {};
        this.category = {};

    }

    activate(params, routeconfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        this.articleUrl = "default";

        if (!params.category) {
            params.category = "default";
        }
        
        if (params.article) {
            this.articleUrl = params.article;
        }

        this.loadCategory(params.category);
    }

    loadArticles(categoryId) {
        this.articleService.getArticles(categoryId)
            .then(articles => {
                this.articles = articles;
                this.selectSideNavigationItem();
            });
    }

    loadCategory(categoryUrl) {
        this.setEditMode(false);

        this.articleService.getCategory(categoryUrl)
            .then(category => {
                this.category = category;

                if (this.category && this.category.categoryId > 0) {
                    this.navigation.selectMenuItem(category.url);

                    this.articleService.getArticleByUrl(this.category.categoryId, this.articleUrl)
                        .then(result => {
                            this.article = result;
                            this.setEditMode(false);
                            this.loadArticles(this.category.categoryId);
                        });

                }
            });
    }

    setEditMode (editMode) {
        this.editMode = editMode;
        this.navigation.menu.editMode = editMode;
        this.eventAggregator.publish(this.articleEvents.subscribed.onEditModeChanged, editMode);
    }

    startEdit() {
        this.originalArticle = Object.assign({}, this.article);

        this.setEditMode(true);

        this.validationRules = ValidationRules
                .ensure(u => u.title).displayName('Strategy name').required().withMessage(`\${$displayName} cannot be blank.`)
                .ensure(u => u.summary).displayName('Summary').required().withMessage(`\${$displayName} cannot be blank.`)
                .ensure(u => u.url).displayName('Strategy url').required().withMessage(`\${$displayName} cannot be blank.`)
            .on(this.article);

    }

    cancelEdit() {
        this.setEditMode(false);

        if(this.article.articleId > 0) {
            this.article = this.originalArticle;
            this.article.editMode = false;
        } else {
            this.article.deleted = true;
        }
        this.validation.reset();
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

        this.startEdit();
        this.validation.validate();
    }

    selectSideNavigationItem() {
        let self = this;

        if (this.articles && this.articles.length > 0) {
            this.articles.forEach(function(item) {
                item.selected = item.articleId === self.article.articleId;
            });
        }
    }

    navigateToArticle(url) {
        if (url && url.length > 0) {
            this.setEditMode(false);
            let articleUrl =  '/' + this.navigation.section.url + '/' + this.category.url + '/' + url;
            this.router.navigate(articleUrl);
        }
    }

    deleteArticle() {
        let self = this;

        if (this.article && this.article.articleId > 0) {
            this.articleService.deleteArticle(this.article.articleId)
                .then(response => {
                    toastr.success('Article deleted successfully', 'Article Deleted');
                    self.setEditMode(false);
                    self.router.navigate('/studies' );
                })
                .catch(error => {
                    toastr.error('Failed to delete article', 'Delete Failed');
                });   

        }
    }

    trySaveArticle() {
        this.validation.validate()
            .then(response => {
                let valid = false;
                if(response.valid === true) {
                    if (this.articlePartsValidate()) {
                        valid = true;
                    }
                }
                if (valid) {
                    this.saveArticle();

                } else {
                    toastr.warning('Please correct validation errors.', 'Validation Errors');
                }
            })
            .catch(error => {
                this.handleError(error);
            });    
    }

    articlePartsValidate() {
        if (this.article.blocks.length > 0) {
            let index = this.article.blocks.findIndex(b => !b.valid);
            return index === -1;
        } else {
            toastr.warning('Article is empty', 'Validation Errors');
            return false;
        }
    }
    
    saveArticle() {
        
        let self = this;
        this.setEditMode(false);

        this.articleService.saveArticle(this.article)
            .then(data => {
              
                toastr.success(`Article staved successfully!`, 'Strategy saved');
                self.navigateToArticle(this.article.url);
            })
            .catch(error => {
                this.setEditMode(true);
                toastr.error(`Failed to save article!`, 'Application Error');
            });    
    }

}
