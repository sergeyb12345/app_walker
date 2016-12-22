import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class RuleSetItem {
    @bindable rule;

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
    }

    onExpanded() {
        this.rule.expanded = !!!this.rule.expanded;
    }

    startDelete() {
        this.rule.deleteMode = true;
        this.rule.expanded = true;
    }

    confirmDelete() {
        this.rule.deleteMode = false;
        this.rule.expanded = false;
    }

    cancelDelete() {
        this.rule.deleteMode = false;
        this.rule.expanded = false;
    }

    onMoveUp() {
        this.eventAggregator.publish('rule-set-item-up-' + this.rule.ruleSetId, this.rule);
        return false;
    }

    onMoveDown() {
        this.eventAggregator.publish('rule-set-item-down-' + this.rule.ruleSetId, this.rule);
        return false;
    }
}