import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserContext} from '../../../account/user-context';

@inject(EventAggregator, UserContext)
export class StrategyAdmin {
    
    constructor (eventAggregator, userContext) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
    }
}