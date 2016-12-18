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

        this.period = 'daily';
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        this.dailyRulesUrl =  '/strategies/rules/daily';
        this.weeklyRulesUrl = '/strategies/rules/weekly';


        if (params.period) {
            this.period = params.period;
            this.loadRules(this.period);

        } else {
            this.router.navigate(this.dailyRulesUrl);
        }
        
    }

    loadRules(period) {
        let nPeriod = 0;
        if(period && period.toLowerCase() === 'weekly'){
            nPeriod = 1;
        }

        this.ruleService.getRulesForPeriod(nPeriod)
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