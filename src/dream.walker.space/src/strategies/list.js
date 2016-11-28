﻿import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../services/strategy-service';

@inject(EventAggregator, StrategyService, "ErrorParser")
export class List {

    constructor (eventAggregator, strategyService, errorParser) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.editMode = false;
        this.errors = [];
        this.strategies = [];
    }

    activate(params, routeConfig, navigationInstruction) {

        let self = this;
        this.router = navigationInstruction.router;
        this.strategyService.getAll()
            .then(data => {
                self.strategies = data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    attached() {
        //subscribe here
    }

    generateUrl(strategy) {
        let url = "";

        if (strategy && strategy.strategyId) {
            url = this.router.generate("strategy-edit", {strategy: strategy.url});
        }
        return url;
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