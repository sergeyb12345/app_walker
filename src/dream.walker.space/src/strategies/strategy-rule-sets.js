import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';
import {RuleSetService} from '../services/rule-set-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, Navigation, StrategyService, RuleSetService, "Settings")
export class StrategyRuleSets {
    
    constructor (eventAggregator, strategyNavigation, strategyService, ruleSetService, settings) {
        this.strategyNavigation = strategyNavigation;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.ruleSetService = ruleSetService;
        this.periods = settings.periods;

        this.strategy = {};
        this.strategyUrl = '';
        this.rulesets = [];
        this.editMode = false;
        this.periodRuleSets = [];
        this.subscriptions = [];

        this.subscribe();
    }
    
    subscribe() {
        this.subscriptions.push(
            this.eventAggregator.subscribe('strategy-rule-set-up', ruleSetId => this.moveRuleSetUp(ruleSetId)));

        this.subscriptions.push(
            this.eventAggregator.subscribe('strategy-rule-set-down', ruleSetId => this.moveRuleSetDown(ruleSetId)));

        this.subscriptions.push(
            this.eventAggregator.subscribe('strategy-rule-set-detach', ruleSetId => this.detachRuleSet(ruleSetId)));
    }

    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    moveRuleSetUp(ruleSetId) {
        let index = this.rulesets.findIndex(item => item.ruleSetId === ruleSetId);
        if(index > 0) {
            this.rulesets.splice(index - 1, 0, this.rulesets.splice(index, 1)[0]);
        }
    }

    moveRuleSetDown(ruleSetId) {
        let index = this.rulesets.findIndex(item => item.ruleSetId === ruleSetId);
        if(index > -1 && index < this.rulesets.length - 1) {
            this.rulesets.splice(index + 1, 0, this.rulesets.splice(index, 1)[0]);
        }
    }

    detachRuleSet(ruleSetId) {
        let index = this.rulesets.findIndex(item => item.ruleSetId === ruleSetId);
        if(index !== -1) {
            this.rulesets.splice(index, 1);
        }
    }

    activate(params, routeConfig, navigationInstruction) {
        if (params.strategyUrl) {

            this.strategyService.getSummaryByUrl(params.strategyUrl)
                .then(data => {
                    if (data && data.strategyId) {
                        this.strategy = data;
                        this.strategyUrl = params.strategyUrl;
                        this.strategyNavigation.configureNavigation(this.strategyUrl);

                        this.loadRuleSets(this.strategy.strategyId);

                    } else {
                        toastr.error(`Failed to load summary for url ${params.strategyUrl}`, 'Load Summary Failed');
                    }
                });
        }
    }

    loadRuleSets(strategyId) {

        this.ruleSetService.getRuleSetsForStrategy(strategyId)
            .then(data => {
                this.rulesets = data;
            });
    }

    startEdit() {
        let self = this;
        this.originalRulesets = [];
        this.rulesets.forEach(function(item) {
            self.originalRulesets.push(Object.assign({}, item));
        });

        this.setEditMode(true);
    }

    cancelEdit() {
        this.rulesets = this.originalRulesets;
        this.setEditMode(false);
    }

    setEditMode(mode) {
        this.editMode = mode;

        if (this.rulesets.length > 0) {
            this.rulesets.forEach(function(item) {
                item.editMode = mode;
            });
        }
    }

    addRuleSet() {
        this.attachedRuleSet = {
            ruleSetId: 0,
            period: -1,
            description: ''
        };

        this.addingMode = true;
    }

    cancelAddRuleSet() {
        this.addingMode = false;
    }

    onPeriodSelected() {
        this.ruleSetService.getRuleSetsForPeriod(this.attachedRuleSet.period)
            .then(data => {
                this.periodRuleSets = data;
            });
    }

    onRuleSetSelected() {
        let index = this.periodRuleSets.findIndex(r => r.ruleSetId === this.attachedRuleSet.ruleSetId);
        if (index !== -1) {
            this.attachedRuleSet = this.periodRuleSets[index];
        }
    }

    confirmAddRuleSet() {

        let rs = {
            editMode: true,
            ruleSetName: this.attachedRuleSet.name,
            ruleSetDescription: this.attachedRuleSet.description,
            ruleSetPeriod: this.attachedRuleSet.period,
            ruleSetId: this.attachedRuleSet.ruleSetId
        };
        if (this.validateRuleSet(rs)) {

            this.rulesets.push(rs);
            this.addingMode = false;
        }
    }

    validateRuleSet(ruleSet) {
        let result = true;

        if (ruleSet.ruleSetId > 0) {
            let index = this.rulesets.findIndex(r => r.ruleSetId === ruleSet.ruleSetId);
            if (index !== -1) {
                result = false;
                toastr.warning(`Selected Rule Set is already part of this strategy`, 'Validation Error');
            }
        } else {
            result = false;
            toastr.warning(`Selected Rule Set doesn't have ID`, 'Validation Error');
        }

        return result;
    }

    trySaveRuleSets() {
        if (this.rulesets && this.rulesets.length > 0) {
            this.saveRuleSets();
        } else {
            toastr.warning(`At least 1 rule set must be attached`, 'Validation Error');
        }
    }

    saveRuleSets() {
        let orderId = 1;
        let strategyId = this.strategy.strategyId;

        this.rulesets.forEach(function(item) {
            item.ruleSetOrderId = orderId;
            item.strategyId = strategyId;

            orderId = orderId + 1;
        });

        this.ruleSetService.saveRuleSetsForStrategy(this.strategy.strategyId, this.rulesets)
            .then(data => {
                if (data.ok) {
                    this.setEditMode(false);
                    toastr.success('Rule Sets are successfully saved', 'Rule Sets Attached');
                }
            });
    }
}