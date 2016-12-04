import {bindable, inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject("User", EventAggregator)
export class SubNav {
    @bindable router;

    constructor (userContext, eventAggregator) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
    }

    actionsChanged(newValue) {
        
    }

    publishEvent(channel, params) {
        this.eventAggregator.publish(channel, params);
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