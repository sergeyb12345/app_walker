import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from './services/rule-service';

@inject(HttpClient, EventAggregator, RuleService)
export class Settings {

    constructor (httpClient, eventAggregator, ruleService) {
        this.eventAggregator = eventAggregator;
        this.ruleService = ruleService;

        httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.sections = [];
        this.http = httpClient;
        this.initialized = false;
        this.homePage = 'studies';
        this.indicators = [];

        this.periods = [
            {id:0, name: 'Daily', url: 'daily'},
            {id:1, name: 'Weekly', url: 'weekly'}
        ];

        this.defaultPeriod = this.periods[0];
    }
    
    selectPeriod(periodUrl) {
        let index = this.periods.findIndex(i => i.url.toLowerCase() === periodUrl.toLowerCase());
        if(index === -1) {
            return this.defaultPeriod;
        }
        return this.periods[index];
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
                return response.json()
                    .then(sections => {
                        this.sections = sections;
                        
                        //return this.ruleService.

                        this.initialized = true;
                    });
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