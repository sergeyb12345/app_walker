import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LogManager} from 'aurelia-framework';

@inject(HttpClient, EventAggregator)
export class Settings {

    constructor (httpClient, eventAggregator) {
        this.eventAggregator = eventAggregator;

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
                return this.handleError(error, "initialize");
            });
    }



    handleError(error,  source) {
        let exception = {
            source: "Settings->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}