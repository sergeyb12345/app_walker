import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {IndicatorService} from './services/indicator-service';

@inject(HttpClient, EventAggregator, IndicatorService)
export class Settings {

    constructor (httpClient, eventAggregator, indicatorService) {
        this.eventAggregator = eventAggregator;
        this.indicatorService = indicatorService;

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
                        
                        return this.indicatorService.getNames()
                            .then(response => {
                                this.indicators = response;
                            })
                            .catch(error => {
                                return this.handleError(error, "initialize");
                            });

                    });
            })
            .catch(error => {
                return this.handleError(error, "initialize");
            });
    }

    getIndicators(period) {
        return this.indicators.filter(indicator => indicator.period === period);
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