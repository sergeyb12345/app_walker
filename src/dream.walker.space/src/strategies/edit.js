import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../services/strategy-service';

@inject(EventAggregator, StrategyService, "ErrorParser")
export class Edit {

    constructor (eventAggregator, strategyService, errorParser) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.editMode = false;
        this.errors = [];
    }

    activate(params, routeConfig, navigationInstruction) {

        let self = this;
        this.router = navigationInstruction.router;

        if (!params.strategy) {
            params.strategy = "default";
        }

        //this.strategyService.getAll()
        //    .then(data => {
        //        self.strategies = data;
        //    })
        //    .catch(error => {
        //        this.handleError(error);
        //    });
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