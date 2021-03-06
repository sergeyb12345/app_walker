﻿import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleSetService} from '../../services/rule-set-service';

@inject(EventAggregator, RuleSetService, "ErrorParser", "Settings", "User")
export class RuleSets {

    constructor (eventAggregator, ruleSetService, errorParser, globalSettings, userContext) {
         this.powerUser = userContext.user.isAuthenticated;
        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.ruleSetService = ruleSetService;
        this.globalSettings = globalSettings;
        this.subscriptions = [];
        this.errors = [];
        this.rulesets = [];

        this.activePeriod = this.globalSettings.defaultPeriod;
        this.periods = this.globalSettings.periods;
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        if (params.period) {
            this.activePeriod = this.activatePeriod(params.period);
            this.loadRuleSets(this.activePeriod.id);

        } else {
            let defaultUrl = '/strategies/rule-sets/' + this.activePeriod.url;
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

    addRuleSet() {
        let rule = {
            name: 'New Rule set',
            description: '',
            expanded: true,
            period: this.activePeriod.id,
            editMode: true,
            ruleSetId: 0,
            rules: []
        };

        this.rulesets.push(rule);
    }

    loadRuleSetsForPeriod (period){
        let url = `/strategies/rule-sets/${period.url}`;
        this.router.navigate(url);
    }

    isPeriodActive(period) {
        return period.id === this.activePeriod.id;
    }

    loadRuleSets(periodId) {

        this.ruleSetService.getRuleSetsForPeriod(periodId)
            .then(result => {
                this.rulesets = result;
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