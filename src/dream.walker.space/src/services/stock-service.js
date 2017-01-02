import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class StockService {
    
    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    updateQuotes(ticker) {

        return this.http.fetch('stock/'+ticker + '/update-quotes', {
            method: 'put'
        })
        .then(response => {
                return response;
            })
        .catch(error => {
            return this.handleError(error, "updateQuotes");
        });
    }


    handleError(error,  source) {
        let exception = {
            source: "RuleService->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}