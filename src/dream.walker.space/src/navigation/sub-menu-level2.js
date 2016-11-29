import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class SubMenuLevel2 {
    @bindable router;

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
    }

    attached() {
    }

    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

}