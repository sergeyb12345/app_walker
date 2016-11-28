import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../services/strategy-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../common/bootstrap-form-renderer"

@inject(EventAggregator, StrategyService, "ErrorParser", ValidationController)
export class Edit {

    constructor (eventAggregator, strategyService, errorParser, validation) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;

        this.subscriptions = [];
        this.editMode = false;
        this.errors = [];
        this.strategy = {};

        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());
    }

    activate(params, routeConfig, navigationInstruction) {

        let self = this;
        this.router = navigationInstruction.router;

        if (params.strategy) {

            this.strategyService.getByUrl(params.strategy)
                .then(data => {
                    self.strategy = data;

                    ValidationRules
                        .ensure(u => u.name)
                            .required()
                            .minLength(3)
                        .ensure(u => u.url)
                            .required()
                            .minLength(3)
                        .on(self.strategy);

                })
                .catch(error => {
                    this.handleError(error);
                });

        }
    }

    update() {
        if (!this.strategy) {
            return;
        }

        if (this.validation.errors && this.validation.errors.length > 0) {
            return;
        }

        this.strategyService.update(this.strategy)
            .then(result => {
                if (result.strategyId > 0) {
                    this.router.navigateToRoute("strategy-list");
                }
            })
            .catch(error => {
                return this.handleError(error, "update");
            });        
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