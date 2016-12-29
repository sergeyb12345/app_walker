import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';
import {RuleSetService} from '../services/rule-set-service';

@inject(Navigation, StrategyService, RuleSetService, "Settings")
export class StrategyRuleSets {
    
    constructor (strategyNavigation, strategyService, ruleSetService, settings) {
        this.strategyNavigation = strategyNavigation;
        this.strategyService = strategyService;
        this.ruleSetService = ruleSetService;
        this.periods = settings.periods;

        this.strategy = {};
        this.strategyUrl = '';
        this.rulesets = [];
        this.editMode = false;
        this.periodRuleSets = [];
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
        
    }

}