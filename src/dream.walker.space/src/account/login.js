import {inject,bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject("User", EventAggregator)
export class Login {

    constructor(userContext, eventAggregator ) {
        this.userContext = userContext;
        this.eventAggregator = eventAggregator;

        this.username = '';
        this.password = '';
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;
    }

    login() {
        this.userContext.login(this.username, this.password)
            .then(result => {
                if (result === 0) {
                    let url = this.router.generate("strategies");
                    window.location.href = url;
                }
            })
        .catch(error => {
            return this.handleError(error, "login");
        });
    }

    handleError(error,  source) {
        let exception = {
            source: "Account.Login->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}