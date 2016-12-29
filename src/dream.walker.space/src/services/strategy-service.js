import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class StrategyService {
    

    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    
    getSummaries() {

        return this.http.fetch('strategy/getSummaries', {
            method: 'get'
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getSummaries");
        });
    }

    getByUrl(url) {

        return this.http.fetch('strategy/getByUrl/'+url, {
            method: 'get'
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getByUrl");
        });
    }    
    
    getSummaryByUrl(url) {

        return this.http.fetch('strategy/getSummaryByUrl/'+url, {
            method: 'get'
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getSummaryByUrl");
        });
    }

    getById(id) {

        return this.http.fetch('strategy/get/'+id, {
            method: 'get'
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getById");
        });
    }    

    update(strategy) {
        return this.http.fetch('strategy', {
            method: 'post',
            body:json(strategy)
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            this.handleError(error, "update");
        });
    }

    handleError(error,  source) {
        let exception = {
            source: "StrategyServices->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return exception;
    }


    deleteStrategy(strategyId) {
        return this.http.fetch('strategy/'+ strategyId, {
            method: 'delete'
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            this.handleError(error, "deleteStrategy");
        });
    }

}