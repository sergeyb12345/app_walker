import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';

@inject(Navigation, StrategyService)
export class StrategyRuleSets {
    
    constructor (strategyNavigation, strategyService) {
        this.strategyNavigation = strategyNavigation;
        this.strategyService = strategyService;

        this.summaries = [];
        this.strategy = {};
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        let self = this;
        this.strategyService.getSummaries()
            .then(data => {
                self.summaries = data;
                self.loadRuleSets(params.strategyUrl);
            })
            .catch(error => {
                toastr.error('Failed to load summaries', 'Load Summaries Failed');
            });   
    }

    loadRuleSets(url) {
        let self = this;
        this.strategy = {};

        if (url && url.length > 0) {

            this.strategy = this.summaries.find(s => s.url.toLowerCase() === url.toLowerCase());
            if (this.strategy) {
                this.buildStrategyNavigation(url.toLowerCase());

            } else {
                self.navigateToDefaultStrategy();
            }


        } else {
            this.navigateToDefaultStrategy();
        }
    }

    setActiveStrategy() {
        let self = this;

        if (this.summaries) {
            this.summaries.forEach(function(item) {
                item.selected = item.strategyId === self.strategy.strategyId;
            });
        }
    }

    navigateToDefaultStrategy() {
        if (this.summaries && this.summaries.length > 0) {
            let strategyUrl = '/strategies/strategy-rule-sets/' + this.summaries[0].url;
            this.router.navigate(strategyUrl);
        } 
    }

    navigateToStrategy(url) {
        if (url && url.length > 0) {
            let strategyUrl = '/strategies/strategy-rule-sets/' + url;
            this.router.navigate(strategyUrl);
        }
    }

    buildStrategyNavigation (url) {
        this.strategyNavigation.items = [];

        let strategyMenuItem =
        {
            isActive: false,
            title: 'Strategy Article',
            url: '/strategies/strategy/' + url,
            name: 'strategy'
        }

        let rulesetsMenuItem = {
            isActive: true,
            title: 'Strategy Rule Sets',
            url: '/strategies/strategy-rule-sets/' + url,
            name: 'rule-sets'
        }

        this.strategyNavigation.items.push(strategyMenuItem);
        this.strategyNavigation.items.push(rulesetsMenuItem);

        this.setActiveStrategy();
    }
}