import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from '../../../services/rule-service';

@inject(EventAggregator, RuleService, "User")
export class Rule {

    @bindable rule;

    constructor (eventAggregator, ruleService, userContext) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.ruleService = ruleService;
        this.subscriptions = [];
        this.rule = {editMode: false, deleteMode: false};

        this.periods = [
            {id:0, name: 'Daily'},
            {id:1, name: 'Weekly'}
        ];

        this.compareTypes = [
            {id: 0, name: 'Greater'},
            {id: 1, name: 'Greater or Equal'},
            {id: 2, name: 'Equal'},
            {id: 3, name: 'Less'},
            {id: 4, name: 'Less or Equal'},
            {id: 4, name: 'Not Equal'}
        ];

        this.dataSources = [
            {id: 0, name: 'Indicator'},
            {id: 1, name: 'Historical Data'},
            {id: 2, name: 'Constant'}
        ];

        this.priceDataSeries = [
            {id: 0, name: 'Close'},
            {id: 1, name: 'Open'},
            {id: 2, name: 'High'},
            {id: 3, name: 'Low'}
        ];

        this.indicatorDataSeries = [
            {id: 0, name: 'EMA (13) Daily'},
            {id: 1, name: 'EMA (26) Daily'}
        ];

        this.transformFunctions = [
            {id: 0, name: 'First'},
            {id: 1, name: 'Max'},
            {id: 2, name: 'Average'},
            {id: 3, name: 'Summarize'}
        ];
    }

    ruleChanged(rule) {
        if (rule) {
            this.rule = rule;

            this.rule.editMode = false;
            this.rule.deleteMode = false;
            this.rule.viewMode = false;

        }
    }  

    startEdit() {
        this.originalRule = Object.assign({}, this.rule);
        this.rule.editMode = true;
        this.rule.deleteMode = false;
        this.rule.viewMode = false;
    }

    cancelEdit() {
        this.rule = this.originalRule;
        this.rule.editMode = false;
        this.rule.deleteMode = false;
        this.rule.viewMode = false;
    }

    tryDelete() {
        this.rule.editMode = false;
        this.rule.deleteMode = true;
        this.rule.viewMode = false;
    }

    cancelDelete() {
        this.rule.editMode = false;
        this.rule.deleteMode = false;
        this.rule.viewMode = false;
    }

    showDetails() {
        this.rule.viewMode = !this.rule.viewMode;
        this.rule.editMode = false;
        this.rule.deleteMode = false;
    }
}