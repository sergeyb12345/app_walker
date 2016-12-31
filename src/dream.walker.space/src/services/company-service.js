import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class CompanyService {
    
    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    getCompany(ticker) {

        return this.http.fetch('company/'+ticker, {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getCompany");
        });
    }

    searchCompanies(ticker, maxCount) {
        let model = {
            ticker: ticker,
            maxCount: maxCount
        };

        return this.http.fetch('company/search', {
            method: 'post',
            body:json(model)
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "searchCompanies");
        });
    }

    handleError(error,  source) {
        let exception = {
            source: "CompanyService->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}