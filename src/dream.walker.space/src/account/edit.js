import {inject} from "aurelia-framework";
import {UserContext} from './user-context';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';

@inject(UserContext, EventAggregator, Router)
export class Edit {
    
    constructor(userContext, eventAggregator, router) {
        this.userContext = userContext;
        this.eventAggregator = eventAggregator;
        this.router = router;
    }

    activate() {
        this.user = this.userContext.user;
    }

    update() {
        this.userContext.update(this.user)
            .then(result => {
                if (result === 0) {
                    this.router.navigate("view");
                }
            })
        .catch(error => {
            return this.handleError(error);
        });
    
    }

    handleError(error) {
        this.eventAggregator.publish('GeneralExceptions', error);
    }
}