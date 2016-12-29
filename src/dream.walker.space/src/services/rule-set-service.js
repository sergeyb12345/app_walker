import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class RuleSetService {
    
    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    getRuleSet(id) {

        return this.http.fetch('ruleset/'+id, {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getRuleSet");
        });
    }

    getRuleSetsForPeriod(period) {

        return this.http.fetch('ruleset/'+period + '/all', {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getRuleSetsForPeriod");
        });
    }

    getRuleSetsForStrategy(strategyId) {

        return this.http.fetch('ruleset/strategy/'+strategyId, {
            method: 'get'
        })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "getRuleSetsForStrategy");
        });
    }

    deleteRuleSet(id) {
        return this.http.fetch("ruleset/"+id, {method: 'delete'})
            .then(response => {
                return response;
            })
            .catch(error => {
                return this.handleError(error, "deleteRuleSet");
            });
    }
    
    saveRuleSet(ruleSet) {
        return this.http.fetch("ruleset", {
            method: 'post',
            body:json(ruleSet)
        })
        .then(response => response.json())
        .catch(error => {
            this.handleError(error, "saveRuleSet");
        });
    }


    handleError(error,  source) {
        let exception = {
            source: "RuleSetService->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}