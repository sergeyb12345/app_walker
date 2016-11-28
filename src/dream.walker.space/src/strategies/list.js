import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyServices} from '../services/strategy-service';

@inject(EventAggregator, StrategyServices, "ErrorParser")
export class List {

    constructor (eventAggregator, strategyServices, errorParser) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyServices = strategyServices;
        this.subscriptions = [];
        this.editMode = false;
        this.errors = [];
        this.strategies = [];
    }

    activate(params, routeConfig, navigationInstruction) {

        let self = this;
        this.router = navigationInstruction.router;
        this.strategyServices.getAll()
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