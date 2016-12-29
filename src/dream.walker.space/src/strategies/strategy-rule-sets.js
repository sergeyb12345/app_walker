import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';
import {RuleSetService} from '../services/rule-set-service';

@inject(Navigation, StrategyService, RuleSetService)
export class StrategyRuleSets {
    
    constructor (strategyNavigation, strategyService, ruleSetService) {
        this.strategyNavigation = strategyNavigation;
        this.strategyService = strategyService;
        this.ruleSetService = ruleSetService;

        this.strategy = {};
        this.strategyUrl = '';
        this.rulesets = [];
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

}