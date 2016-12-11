import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from '../../services/rule-service';

@inject(EventAggregator, RuleService, "ErrorParser")
export class RuleSets {

    constructor (eventAggregator, strategyService, errorParser) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.subscriptions = [];
        this.errors = [];
        this.ruleSets = [];
    }
}