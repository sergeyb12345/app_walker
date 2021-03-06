﻿import * as toastr from "toastr";
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
            {id: 5, name: 'Not Equal'}
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
            {id: 3, name: 'Low'},
            {id: 4, name: 'Volume'}
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

            //this.ruleInfo.editMode = false;
        }
    }  

    onExpanded() {
        this.ruleInfo.expanded = !!!this.ruleInfo.expanded;
        if(this.ruleInfo.expanded !== true && this.ruleInfo.ruleId > 0 && this.ruleInfo.editMode === true) {
            this.cancelEdit();
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
        this.validationRules = ValidationRules
            .ensure(u => u.name).displayName('Rule name').required().withMessage(`\${$displayName} cannot be blank.`)
            .ensure(u => u.description).displayName('Rule description').required().withMessage(`\${$displayName} cannot be blank.`)
            .ensure(u => u.skipItemsV1).displayName('Skip value').required().withMessage(`\${$displayName} cannot be blank.`)
                .satisfies(value => value >= 0 && value < 1000).withMessage(`\${$displayName} must be between 0 - 999.`)
            .ensure(u => u.skipItemsV2).displayName('Skip value').required().withMessage(`\${$displayName} cannot be blank.`)
                .satisfies(value => value >= 0 && value < 1000).withMessage(`\${$displayName} must be between 0 - 999.`)
            .ensure(u => u.takeItemsV1).displayName('Take value').required().withMessage(`\${$displayName} cannot be blank.`)
                .satisfies(value => value >= 0 && value < 1000).withMessage(`\${$displayName} must be between 0 - 999.`)
            .ensure(u => u.takeItemsV2).displayName('Take value').required().withMessage(`\${$displayName} cannot be blank.`)
                .satisfies(value => value >= 0 && value < 1000).withMessage(`\${$displayName} must be between 0 - 999.`)
            .on(this.ruleInfo);

    }

    cancelEdit() {
        if(this.ruleInfo.ruleId > 0) {
            this.ruleInfo = this.originalRule;
            this.ruleInfo.editMode = false;
        } else {
            this.ruleInfo.deleted = true;
        }
        this.validation.reset();
    }

    cancelDelete() {
        this.ruleInfo.deleteMode = false;
        this.ruleInfo.expanded = false;
    }

    startDelete() {
        this.ruleInfo.deleteMode = true;
        this.ruleInfo.expanded = true;
    }

    confirmDelete() {
        this.ruleService.deleteRule(this.ruleInfo.ruleId) 
            .then(response => {
                this.ruleInfo.deleted = true;
                toastr.success(`Rule ${response.name} deleted successfully!`, 'Rule Deleted');
            })
            .catch(error => {
                this.handleError(error);
                toastr.error("Failed to delete rule", "Error");
            });    
    }

    trySaveRule() {
        this.validation.validate()
            .then(response => {
                if(response.valid === true) {
                    this.saveRule();
                } else {
                    toastr.warning('Please correct validation errors.', 'Validation Errors')
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
                this.ruleInfo.expanded = false;
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