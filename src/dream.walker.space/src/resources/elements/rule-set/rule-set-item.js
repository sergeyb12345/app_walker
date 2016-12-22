import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class RuleSetItem {
    @bindable rule;

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
        this.editMode = false;
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
        this.rule.deleted = true;
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

    detached() {
        this.unsubscribe();
    }
    
    setEditMode(flag) {
        this.editMode = flag;
    }

    unsubscribe() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    attached() {

        this.subscriptions.push(
            this.eventAggregator.subscribe('rule-set-edit-mode-' + this.rule.ruleSetId, flag => this.setEditMode(flag)));

        this.subscriptions.push(
            this.eventAggregator.subscribe('rule-set-edit-mode-' + this.rule.ruleSetId, flag => this.setEditMode(flag)));

    }
}