﻿import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../common/bootstrap-form-renderer"

@inject("User", EventAggregator, ValidationController)
export class Edit {
    
    constructor(userContext, eventAggregator, validation) {
        this.userContext = userContext;
        this.eventAggregator = eventAggregator;
        this.user = this.userContext.user;
        
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());

        ValidationRules
            .ensure(u => u.firstName)
            .required()
            .minLength(3)
            .on(this.user);
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;
    }

    update() {
        if (this.validation.errors && this.validation.errors.length > 0) {
            return;
        }

        this.userContext.update(this.user)
            .then(result => {
                if (result === 0) {
                    this.router.navigate("view");
                }
            })
        .catch(error => {
            return this.handleError(error, "update");
        });
    
    }

    handleError(error,  source) {
        let exception = {
            source: "Account.Edit->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}