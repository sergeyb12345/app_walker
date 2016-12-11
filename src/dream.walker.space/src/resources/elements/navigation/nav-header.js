import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject("User", "Settings", EventAggregator)
export class NavHeader {
    @bindable router = null;

    constructor(userContext, settings, eventAggregator) {
        this.userContext = userContext;
        this.eventAggregator = eventAggregator;
        this.settings = settings;
    }

    routerChanged(newValue, oldVlalue){
        this.router = newValue;
    }

    attached() {
        this.isAuthenticated = this.userContext.user.isAuthenticated;
        this.loginUrl = this.router.generate("account")+'/view';
    }

    logout() {
        this.userContext.logout()
            .then(result => {
                window.location.href = '/';
            })
        .catch(error => {
            return this.handleError(error, "logout");
        });    
    }

    handleError(error,  source) {
        let exception = {
            source: "NavHeader->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}