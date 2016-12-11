import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from '../../services/rule-service';

@inject(EventAggregator, RuleService, "ErrorParser")
export class Rules {

    constructor (eventAggregator, ruleService, errorParser) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.ruleService = ruleService;
        this.subscriptions = [];
        this.errors = [];
        this.rules = [];

        this.period = 0;
    }

    activate(params, routeconfig) {

        if (params.period) {
            this.period = params.period;
        }
        
        this.loadRules(this.period);
    }

    loadRules(period) {
        this.ruleService.getRulesForPeriod(period)
            .then(result => {
                this.rules = result;
            })
            .catch(error => {
                return this.handleError(error, "update");
            });     
    }

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }
}