import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';

@inject(Navigation, StrategyService, "Settings")
export class StrategyPlayground {
    
    constructor (strategyNavigation, strategyService, settings) {
        this.strategyNavigation = strategyNavigation;
        this.strategyService = strategyService;
        this.periods = settings.periods;

        this.strategy = {};
        this.strategyUrl = '';
    }

    activate(params, routeConfig, navigationInstruction) {
        if (params.strategyUrl) {

            this.strategyService.getSummaryByUrl(params.strategyUrl)
                .then(data => {
                    if (data && data.strategyId) {
                        this.strategy = data;
                        this.strategyUrl = params.strategyUrl;
                        this.strategyNavigation.configureNavigation(this.strategyUrl);

                        this.loadPlayground(this.strategy.strategyId);

                    } else {
                        toastr.error(`Failed to load summary for url ${params.strategyUrl}`, 'Load Summary Failed');
                    }
                });
        }
    }

    loadPlayground() {
        
    }
}