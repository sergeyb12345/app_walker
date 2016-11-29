import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../../services/strategy-service';

@inject(EventAggregator, StrategyService, "ErrorParser")
export class Create {

    constructor (eventAggregator, strategyService, errorParser) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.errors = [];
        this.rule = {};
    }
}