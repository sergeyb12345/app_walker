import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, "Settings")

export class StrategyRuleSet {
    @bindable ruleset;

    constructor (eventAggregator, settings) {
        this.periods = settings.periods;
        //this.eventAggregator = eventAggregator;
    }

    //attached () {
    //    this.subscription = this.eventAggregator.subscribe('onStrategyRuleSetEditModeChanged', mode => this.onEditModeChanged(mode));        
    //}

    //detached () {
    //    if (this.subscription) {
    //        this.subscription.dispose();
    //    }
    //}

    //onEditModeChanged(mode) {
    //    this.editMode = mode;
    //}

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

}