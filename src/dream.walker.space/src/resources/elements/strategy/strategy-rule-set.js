import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, "Settings")

export class StrategyRuleSet {
    @bindable ruleset;

    constructor (eventAggregator, settings) {
        this.periods = settings.periods;
        this.eventAggregator = eventAggregator;
    }

    rulesetChanged(newValue) {
        if (newValue) {
        }
    }

    onExpanded() {
        this.ruleset.expanded = !!!this.ruleset.expanded;
    }

    cancelDelete() {
        this.ruleset.deleteMode = false;
        this.ruleset.expanded = false;
    }

    startDelete() {
        this.ruleset.deleteMode = true;
        this.ruleset.expanded = true;
    }

    setOptionalStatus(flag) {
        this.ruleset.ruleSetOptional = flag;
    }

    onMoveUp() {
        this.eventAggregator.publish('strategy-rule-set-up', this.ruleset.ruleSetId);
    }

    onMoveDown() {
        this.eventAggregator.publish('strategy-rule-set-down', this.ruleset.ruleSetId);
    }

    confirmDelete() {
        this.eventAggregator.publish('strategy-rule-set-detach', this.ruleset.ruleSetId);
    }
}