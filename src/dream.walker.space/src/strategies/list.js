import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../services/strategy-service';

@inject(EventAggregator, StrategyService, "ErrorParser", "User")
export class List {

    constructor (eventAggregator, strategyService, errorParser, userContext) {
        this.powerUser = userContext.user.isAuthenticated;
        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.editMode = false;
        this.errors = [];
        this.summaries = [];
        this.strategy = {};
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        let self = this;
        this.strategyService.getSummaries()
            .then(data => {
                self.summaries = data;
                self.loadStrategy(params.strategyUrl);
            });
    }

    navigateToStrategy(url) {
        if (url && url.length > 0) {
            let strategyUrl = '/strategies/strategy/' + url;
            this.router.navigate(strategyUrl);
        }
    }

    loadStrategy(url) {
        let self = this;

        if (url && url.length > 0) {
            this.strategyService.getByUrl(url)
                .then(data => {
                    if (data && data.strategyId) {
                        self.strategy = data;
                        self.selectActiveSummary(data.strategyId);
                    } else {
                        self.navigateToDefaultStrategy();
                    }
                });

        } else {
            this.navigateToDefaultStrategy();
        }
    }

    selectActiveSummary(id) {
        this.summaries.forEach(function(item) {
            item.selected = item.strategyId === id;
        });
    }

    navigateToDefaultStrategy() {
        if (this.summaries && this.summaries.length > 0) {
            let strategyUrl = '/strategies/strategy/' + this.summaries[0].url;
            this.router.navigate(strategyUrl);
        } 
    }

    attached() {
        //subscribe here
    }


    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }
}