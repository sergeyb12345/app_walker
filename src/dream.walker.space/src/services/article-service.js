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
                return this.handleError(error, "getArticle");
            });
    }    
    
    deleteArticle(id) {
        return this.http.fetch("article/"+id, {method: 'delete'})
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "deleteArticle");
            });
    }
    

    getArticleByUrl(categotyId, articleUrl) {
        return this.http.fetch("article/url/"+categotyId+"/"+articleUrl)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "getArticleByUrl");
            });
    }


    getSection(url) {
        return this.http.fetch("article/section/"+url)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "getSection");
            });
    }
    
    getCategories(sectionId) {

        return this.http.fetch("article/categories/"+sectionId)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "getCategories");
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
                return this.handleError(error, "getFeatured");
            });
    }    

    getArticles(categoryId) {
        return this.http.fetch("article/"+categoryId+"/all")
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "getArticles");
            });
    }

    saveArticle(article) {
        return this.http.fetch('article', {
            method: 'post',
            body:json(article)
        })
        .then(response => response.json())
        .catch(error => {
            this.handleError(error, "saveArticle");
        });
    }

    saveCategory(category) {
        return this.http.fetch('article/category', {
            method: 'post',
            body:json(category)
        })
        .then(response => response.json())
        .catch(error => {
            this.handleError(error, "saveCategory");
        });
    }

    deleteCategory(categoryId) {
        return this.http.fetch('article/category/'+categoryId, {
            method: 'delete'
        })
        .then(response => response.json())
        .catch(error => {
            this.handleError(error, "deleteCategory");
        });

    }

    handleError(error,  source) {
        let exception = {
            source: "ArticleService->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}