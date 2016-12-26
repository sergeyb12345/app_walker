﻿import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../services/strategy-service';
import articleEvents from  "../resources/elements/article-parts/article-events";
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../common/bootstrap-form-renderer"

@inject(EventAggregator, StrategyService, "ErrorParser", "User", ValidationController)
export class List {

    constructor (eventAggregator, strategyService, errorParser, userContext, validation) {
        this.powerUser = userContext.user.isAuthenticated;
        this.errorParser = errorParser;
        this.articleEvents = articleEvents;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;

        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());

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
        this.originalStrategy = Object.assign({}, this.strategy);

        this.eventAggregator.publish(this.articleEvents.subscribed.onEditModeChanged, true);
        this.setEditMode(true);

        this.validationRules = ValidationRules
                .ensure(u => u.title).displayName('Strategy name').required().withMessage(`\${$displayName} cannot be blank.`)
                .ensure(u => u.summary).displayName('Summary').required().withMessage(`\${$displayName} cannot be blank.`)
                .ensure(u => u.url).displayName('Strategy url').required().withMessage(`\${$displayName} cannot be blank.`)
            .on(this.strategy);

    }

    cancelEdit() {
        this.eventAggregator.publish(this.articleEvents.subscribed.onEditModeChanged, false);
        this.setEditMode(false);

        if(this.strategy.strategyId > 0) {
            this.strategy = this.originalStrategy;
            this.strategy.editMode = false;
        } else {
            this.strategy.deleted = true;
        }
        this.validation.reset();
    }

    trySaveArticle() {
    }

    subscribe() {
        this.unsubscribe();
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