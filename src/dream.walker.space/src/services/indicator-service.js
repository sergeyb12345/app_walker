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
    }

    getNames() {

        return this.http.fetch('indicator/all', { 
            method: 'get' 
        })
        .then(response => { return response.json()})
        .catch(error => {
            return this.handleError(error, "getNames");
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