import * as toastr from "toastr";
import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {IndicatorService} from '../../../services/indicator-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../../../common/bootstrap-form-renderer"

@inject(EventAggregator, IndicatorService, "User", ValidationController, "Settings", "ErrorParser")
export class Indicator {

    @bindable indicator;

    constructor (eventAggregator, indicatorService, userContext, validation, globalSettings, errorParser) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.globalSettings = globalSettings;
        this.errorParser = errorParser;
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());
        this.errors =[];
        this.indicatorService = indicatorService;
        this.subscriptions = [];
        this.indicatorDataSeries = [];
        this.periods = this.globalSettings.periods;
        this.formulaes = ['EMA','MACD','ForceIndex']
    }

    indicatorChanged(indicatorItem) {
        if (indicatorItem) {
            let newIndicator = Object.assign({}, indicatorItem);
            this.indicatorInfo = newIndicator;
        }
    }  

    onExpanded() {
        this.indicatorInfo.expanded = !!!this.indicatorInfo.expanded;
        if(this.indicatorInfo.expanded !== true && this.indicatorInfo.indicatorId > 0 && this.indicatorInfo.editMode === true) {
            this.cancelEdit();
        }
    }

    startEdit() {
        this.originalIndicator = Object.assign({}, this.indicatorInfo);
        this.indicatorInfo.editMode = true;

        ValidationRules
            .ensure(u => u.description).displayName('Indicator Name').required().withMessage(`\${$displayName} cannot be blank.`)
            .on(this.indicatorInfo);

    }

    cancelEdit() {
        if(this.indicatorInfo.indicatorId > 0) {
            this.indicatorInfo = this.originalIndicator;
            this.indicatorInfo.editMode = false;
        } else {
            this.indicatorInfo.deleted = true;
        }
        this.validation.reset();
    }

    cancelDelete() {
        this.indicatorInfo.deleteMode = false;
        this.indicatorInfo.expanded = false;
    }

    startDelete() {
        this.indicatorInfo.deleteMode = true;
        this.indicatorInfo.expanded = true;
    }

    confirmDelete() {
        this.indicatorService.deleteIndicator(this.indicatorInfo.indicatorId) 
            .then(response => {
                this.indicatorInfo.deleted = true;
                toastr.success(`Indicator ${response.name} deleted successfully!`, 'Indicator Deleted');
            })
            .catch(error => {
                this.handleError(error);
                toastr.error("Failed to delete indicator", "Error");
            });    
    }

    trySaveIndicator() {
        this.validation.validate()
            .then(response => {
                if(response.valid === true) {
                    this.saveIndicator();
                } else {
                    toastr.warning('Please correct validation errors.', 'Validation Errors')
                }
            })
            .catch(error => {
                this.handleError(error);
            });    
    }

    saveIndicator(){
        this.indicatorService.saveIndicator(this.indicatorInfo) 
            .then(response => {
                this.indicatorInfo.editMode = false;
                this.indicatorInfo.expanded = false;
                toastr.success(`indicator ${response.name} saved successfully!`, 'Indicator Saved');
            })
            .catch(error => {
                this.handleError(error);
                toastr.error("Failed to save indicator", "Error");
            });    
    }

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }
}