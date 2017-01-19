﻿import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class PlaygroundService {
    

    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    
    loadPlayground(ticker, strategyId, bars) {

        return this.http.fetch('playground/'+ticker+'/'+strategyId + '/' + bars, {
            method: 'get'
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "loadPlayground");
        });
    }


    handleError(error,  source) {
        let exception = {
            source: "PlaygroundService->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return exception;
    }

}