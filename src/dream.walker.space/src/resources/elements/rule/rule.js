import * as toastr from "toastr";
import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from '../../../services/rule-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../../../common/bootstrap-form-renderer"

@inject(EventAggregator, RuleService, "User", ValidationController, "Settings", "ErrorParser")
export class Rule {

    @bindable rule;

    constructor (eventAggregator, ruleService, userContext, validation, globalSettings, errorParser) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.globalSettings = globalSettings;
        this.errorParser = errorParser;
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());
        this.errors =[];
        this.ruleService = ruleService;
        this.subscriptions = [];
        this.ruleInfoInfo = {editMode: false, dataSeriesOptionsV1: [], dataSeriesOptionsV2: [] };
        this.indicatorDataSeries = [];
        this.periods = this.globalSettings.periods;

        this.compareTypes = [
            {id: 0, name: 'Greater'},
            {id: 1, name: 'Greater or Equal'},
            {id: 2, name: 'Equal'},
            {id: 3, name: 'Less'},
            {id: 4, name: 'Less or Equal'},
            {id: 4, name: 'Not Equal'}
        ];

        this.dataSources = [
            {id: 0, name: 'Indicator'},
            {id: 1, name: 'Historical Data'},
            {id: 2, name: 'Constant'}
        ];

        this.priceDataSeries = [
            {id: 0, name: 'Close'},
            {id: 1, name: 'Open'},
            {id: 2, name: 'High'},
            {id: 3, name: 'Low'}
        ];

        this.transformFunctions = [
            {id: 0, name: 'First'},
            {id: 1, name: 'Max'},
            {id: 2, name: 'Average'},
            {id: 3, name: 'Summarize'}
        ];
    }

    ruleChanged(ruleItem) {
        if (ruleItem) {
            let newRule = Object.assign({}, ruleItem);
            this.indicatorDataSeries = this.globalSettings.getIndicators(newRule.period);

            this.setDataSeries(newRule);
            this.ruleInfo = newRule;

            this.ruleInfo.editMode = false;

            ValidationRules
                .ensure(u => u.name).required({message: "^Rule name must be set"})
                .ensure(u => u.description).required({message: "^Description must be set"})
                .ensure(u => u.skipItemsV1).required().satisfies(value => value >= 0)
                .ensure(u => u.skipItemsV2).required().satisfies(value => value >= 0)
                .ensure(u => u.takeItemsV1).required().satisfies(value => value >= 0)
                .ensure(u => u.takeItemsV2).required().satisfies(value => value >= 0)
                .on(this.ruleInfo);

        }
    }  

    onPeriodChange() {
        this.indicatorDataSeries = this.globalSettings.getIndicators(this.ruleInfo.period);
        this.setDataSeries(this.ruleInfo);
    }

    onDataSourceV1Change(){
        this.setDataSeries(this.ruleInfo);
    }

    onDataSourceV2Change(){
        this.setDataSeries(this.ruleInfo);
    }

    setDataSeries(rule){
        if(rule) {

            if(rule.dataSourceV1 === 0) { //indicator
                rule.dataSeriesOptionsV1 = this.indicatorDataSeries;
            }
            if(rule.dataSourceV1 === 1) { //histrical
                rule.dataSeriesOptionsV1 = this.priceDataSeries;
            }
            if(rule.dataSourceV1 === 2) { //const
                rule.dataSeriesOptionsV1 = [];
            }

            if(rule.dataSourceV2 === 0) { //indicator
                rule.dataSeriesOptionsV2 = this.indicatorDataSeries;
            }
            if(rule.dataSourceV2 === 1) { //histrical
                rule.dataSeriesOptionsV2 = this.priceDataSeries;
            }
            if(rule.dataSourceV2 === 2) { //const
                rule.dataSeriesOptionsV2 = [];
            }
        }
    }

    startEdit() {
        this.originalRule = Object.assign({}, this.ruleInfo);
        this.ruleInfo.editMode = true;
    }

    cancelEdit() {
        this.ruleInfo = this.originalRule;
        this.ruleInfo.editMode = false;
    }

    trySaveRule() {
        this.validation.validate()
            .then(response => {
                if(response.valid === true) {
                    this.saveRule();
                }
            })
            .catch(error => {
                this.handleError(error);
            });    
    }

    saveRule(){
        this.ruleService.saveRule(this.ruleInfo) 
            .then(response => {
                this.ruleInfo.editMode = false;
                toastr.success(`Rule ${response.name} saved successfully!`, 'Rule Saved');
            })
            .catch(error => {
                this.handleError(error);
                toastr.error("Failed to save rule", "Error");
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