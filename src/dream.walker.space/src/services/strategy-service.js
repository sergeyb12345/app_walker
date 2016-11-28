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

    
    getAll() {

        return this.http.fetch('strategy/getAll', {
            method: 'get'
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getAll");
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
}