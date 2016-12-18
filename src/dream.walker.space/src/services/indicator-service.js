import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class IndicatorService {
    
    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
        this.indicatorsWeekly = [];
        this.indicatorsDaily = [];
        this.initialized = false;
    }

    initialize(){
        let self = this;
        return this.http.fetch("indicator/all", {
                method: 'get'
            })
            .then(response => {
                return response.json()
                    .then(indicators => {
                        self.indicatorsWeekly = self.filterIndicators(indicators, 1);
                        self.indicatorsDaily = self.filterIndicators(indicators, 0);
                        self.initialized = true;
                    });
            })
            .catch(error => {
                return this.handleError(error, "initialize");
            });
    }

    getIndicator(id) {

        return this.http.fetch('indicator/'+id, {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getIndicator");
        });
    }

    getIndicatorsForPeriod(period) {

        return this.http.fetch('indicator/'+period + '/all', {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getIndicatorsForPeriod");
        });
    }

    deleteIndicator(id) {
        return this.http.fetch("indicator/"+id, {method: 'delete'})
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "deleteIndicator");
            });
    }
    
    saveIndicator(indicator) {
        return this.http.fetch("indicator", {
            method: 'post',
            body:json(indicator)
        })
        .then(response => response.json())
        .catch(error => {
            this.handleError(error, "saveIndicator");
        });
    }

    handleError(error,  source) {
        let exception = {
            source: "IndicatorService->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}