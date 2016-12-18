﻿import {inject} from "aurelia-framework";
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
            this.activePeriod = this.globalSettings.selectPeriod(params.period);
            this.loadRules(this.activePeriod.id);

        } else {
            let defaultUrl = '/strategies/rules/' + this.activePeriod.url;
            this.router.navigate(defaultUrl);
        }
        
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