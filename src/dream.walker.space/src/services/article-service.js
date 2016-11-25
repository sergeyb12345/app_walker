import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class ArticleService {

    constructor (httpClient, eventAggregator) {
        httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.http = httpClient;
        this.eventAggregator = eventAggregator;
    }


    getArticle(id) {
        return this.http.fetch("article/"+id)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }    
    
    deleteArticle(id) {
        return this.http.fetch("article/"+id, {method: 'delete'})
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }
    
    updateArticleOrder(articleId, orderId) {
        let article = {
            ArticleId: articleId,
            OrderId: orderId
        }

        return this.http.fetch("article/"+articleId+"/order", {method: 'put', body:json(article)})
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }

    getArticleByUrl(categotyId, articleUrl) {
        return this.http.fetch("article/url/"+categotyId+"/"+articleUrl)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }


    getSection(url) {
        return this.http.fetch("article/section/"+url)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }
    
    getCategories(sectionId) {

        return this.http.fetch("article/categories/"+sectionId)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }

    getCategory (categoryUrl) {
        return this.http.fetch("article/category/"+categoryUrl)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }

    getFeatured(categoryId) {
        return this.http.fetch("article/"+categoryId+"/featured")
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }    

    getArticles(categoryId) {
        return this.http.fetch("article/"+categoryId+"/all")
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error);
            });
    }

    saveArticle(article) {
        return this.http.fetch('article', {
            method: 'post',
            body:json(article)
        })
        .then(response => response.json());
    }

    saveCategory(category) {
        return this.http.fetch('article/category', {
            method: 'post',
            body:json(category)
        })
        .then(response => response.json());
    }

    deleteCategory(categoryId) {
        return this.http.fetch('article/category/'+categoryId, {
            method: 'delete'
        })
        .then(response => response.json());
    }

    handleError(error) {
        this.eventAggregator.publish('GeneralExceptions', error);
        return error;
    }
}