import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {IndicatorService} from '../../../services/indicator-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../../../common/bootstrap-form-renderer"

@inject(EventAggregator, IndicatorService, "User", ValidationController)
export class Indicator {

    @bindable indicator;

    constructor (eventAggregator, indicatorService, userContext, validation) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());

        this.indicatorService = indicatorService;
        this.subscriptions = [];
        this.errors = [];
    }

    indicatorChanged(indicator) {
        if (indicator) {
            let newIndicator = Object.assign({}, indicator);
            this.newIndicator.editMode = false;
            this.indicator = newIndicator;


            ValidationRules
                .ensure(u => u.name).required({message: "^Indicator name must be set"})
                .ensure(u => u.description).required({message: "^Description must be set"})
                .on(this.newIndicator);

        }
    }  

    startEdit() {
        this.originalIndicator = Object.assign({}, this.indicator);
        this.indicator.editMode = true;
    }

    cancelEdit() {
        this.indicator = this.originalIndicator;
        this.indicator.editMode = false;
    }

    trySaveIndicator() {
        this.validation.validate()
            .then(response => {
                let r = response;
            })
            .catch(error => {
                this.handleError(error);
            });    
    }

    saveIndicator(){
        alert('saved')
    }

    attached() {
        //subscribe here
    }


    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }

}