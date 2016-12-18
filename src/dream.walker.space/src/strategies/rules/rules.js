import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from '../../services/rule-service';

@inject(EventAggregator, RuleService, "ErrorParser", "Settings")
export class Rules {

    constructor (eventAggregator, ruleService, errorParser, globalSettings) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.ruleService = ruleService;
        this.globalSettings = globalSettings;
        this.subscriptions = [];
        this.errors = [];
        this.rules = [];

        this.activePeriod = this.globalSettings.defaultPeriod;
        this.periods = this.globalSettings.periods;
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        if (params.period) {
            this.activePeriod = this.activatePeriod(params.period);
            this.loadRules(this.activePeriod.id);

        } else {
            let defaultUrl = '/strategies/rules/' + this.activePeriod.url;
            this.router.navigate(defaultUrl);
        }
        
    }
    
    activatePeriod(periodUrl) {

        this.periods.forEach(function(element) {
            element.active = false;
        });
        
        let result = {};

        let index = this.periods.findIndex(i => i.url.toLowerCase() === periodUrl.toLowerCase());
        if(index === -1) {
            result = this.defaultPeriod;
        }
        result = this.periods[index];
        result.active = true;

        return result;
    }

    loadRulesForPeriod (period){
        let url = `/strategies/rules/${period.url}`;
        this.router.navigate(url);
    }

    isPeriodActive(period) {
        return period.id === this.activePeriod.id;
    }

    loadRules(periodId) {

        this.ruleService.getRulesForPeriod(periodId)
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