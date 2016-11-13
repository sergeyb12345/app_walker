import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class SubMenu {
    @bindable router;
    @bindable section;

    constructor (eventAggregator) {
        this.editMode = false;
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
    }

    startEdit() {
        this.editMode = true;
        this.eventAggregator.publish(this.section + '-edit-mode', this.editMode);
    }

    cancelEdit() {
        this.editMode = false;
        this.eventAggregator.publish(this.section + '-edit-mode', this.editMode);
    }

    applyChanges() {
        this.eventAggregator.publish(this.section + '-save', true);
    }

    sectionChanged(newValue, oldValue) {
        this.section = newValue;
    }

    attached() {
        this.subscriptions.push(
            this.eventAggregator.subscribe(this.section + '-cancel-edit', flag => this.cancelEdit()));
    }

    detached() {
        this.subscriptions.forEach(function (subscription) {
            subscription.dispose();
        });
    }

}