
import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Settings {

    constructor (httpClient, eventAggregator) {
        httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.sections = [];
        this.http = httpClient;
        this.initialized = false;
        this.homePage = 'studies';
    }
    

    getStudiesSection() {
        if (this.initialized === true) {
            return this.sections.find(s => s.url === "studies");
        }
        return null;
    }

    getSection(sectionId) {
        if (this.initialized === true) {
            return this.sections.find(s => s.sectionId === sectionId);
        }
        return null;
    }

    initialize() {
        return this.http.fetch("article/sections")
            .then(response => {
                response.json()
                .then(sections => {
                        this.sections = sections;
                        this.initialized = true;
                });

                return this;
            })
            .catch(error => {
                return this.handleError(error);
            });
    }



    handleError(error) {
        this.eventAggregator.publish('GeneralExceptions', error);
        return error;
    }
}