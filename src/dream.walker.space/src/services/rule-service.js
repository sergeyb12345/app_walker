import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class RuleService {
    
    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    getRule(id) {

        return this.http.fetch('rule/'+id, {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getRule");
        });
    }

    getRulesForPeriod(period) {

        return this.http.fetch('rule/'+period + '/all', {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getRulesForPerios");
        });
    }

    deleteRule(id) {
        return this.http.fetch("rule/"+id, {method: 'delete'})
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "deleteRule");
            });
    }
    
    saveRule(rule) {
        return this.http.fetch("rule", {
            method: 'post',
            body:json(rule)
        })
        .then(response => response.json())
        .catch(error => {
            this.handleError(error, "saveRule");
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