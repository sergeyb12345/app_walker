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

        this.subscribe();
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
                        if (!self.strategy.blocks) {
                            self.strategy.blocks = [];
                        }
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

    setEditMode (editMode) {
        this.editMode = editMode;
    }

    startEdit() {
        if (this.strategy) {
            this.eventAggregator.publish('start-edit-article', true);
        }

        this.setEditMode(true);
    }

    cancelEdit() {
        if (this.article) {
            this.eventAggregator.publish('cancel-edit-article', true);
        }
 
        this.setEditMode(false);
    }

    trySaveArticle() {

        if (this.article) {
            this.eventAggregator.publish('try-save-article', true);
        }
    }

    subscribe() {
        this.unsubscribe();
        this.eventAggregator.subscribe('save-article', flag => this.saveStrategy(flag));
    }


    unsubscribe() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    detached() {
        this.unsubscribe();
    }

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }
}