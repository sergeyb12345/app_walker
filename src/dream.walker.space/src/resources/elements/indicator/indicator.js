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
        
        this.formulaes = [
            {name:'EMA', defaults: [
                    {paramName:'Period', value: 13}
            ]},
            {name:'MACD', defaults: [
                {paramName:'FastEmaPeriod', value: 12},
                {paramName:'SlowEmaPeriod', value: 26},
                {paramName:'SignalEmaPeriod', value: 9}
            ]},            
            {name:'ImpulseSystem', defaults: [
                {paramName:'FastEmaPeriod', value: 12},
                {paramName:'SlowEmaPeriod', value: 26},
                {paramName:'SignalEmaPeriod', value: 9},
                {paramName:'EmaPeriod', value: 13}
            ]},
            {name:'ForceIndex', defaults: [
                    {paramName:'Period', value: 13}
            ]}
        ];

        this.plotNumbers = [0,1,2,3];
        this.chartTypes = [
            {name:'Ohlc',id: 0},
            {name:'Candlestick', id: 1},
            {name:'Line', id: 2},
            {name:'Column', id: 3},
            {name:'Area', id: 4}
        ];
    }

    indicatorChanged(indicatorItem) {
        if (indicatorItem) {
            let newIndicator = Object.assign({}, indicatorItem);
            this.indicatorInfo = newIndicator;

            if(this.indicatorInfo.isNew === true) {
                this.indicatorInfo.name = this.formulaes[0].name;
                this.indicatorInfo.params = this.formulaes[0].defaults;
            }
        }
    }  

    onExpanded() {
        this.indicatorInfo.expanded = !!!this.indicatorInfo.expanded;
        if(this.indicatorInfo.expanded !== true && this.indicatorInfo.indicatorId > 0 && this.indicatorInfo.editMode === true) {
            this.cancelEdit();
        }
    }

    onFormulaChange() {
        let defParams = this.formulaes.filter(c => c.name === this.indicatorInfo.name);
        if(defParams && defParams.length > 0) {
            this.indicatorInfo.params = defParams[0].defaults;
        } else {
            toastr.warning('Unable to pull default params for selected formula.', 'Data is missing');
        }
    }

    startEdit() {
        this.originalIndicator = Object.assign({}, this.indicatorInfo);
        this.indicatorInfo.editMode = true;

        ValidationRules
            .ensure('description').displayName('Indicator Name').required().withMessage(`\${$displayName} cannot be blank.`)
            .ensure('chartColor').displayName('Line Color').required().withMessage(`\${$displayName} cannot be blank.`)
                .matches(/^#[0-9a-fA-F]{6}$/).withMessage(`\${$displayName} value should be in format: #AAFF99.`)
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
                toastr.success(`Indicator ${this.indicatorInfo.description} deleted successfully!`, 'Indicator Deleted');
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

    saveIndicator() {
        this.errors = [];
        this.indicatorInfo.jsonParams = JSON.stringify(this.indicatorInfo.params);
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