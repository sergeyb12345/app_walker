import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleService} from '../../../services/rule-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../../../common/bootstrap-form-renderer"

@inject(EventAggregator, RuleService, "User", ValidationController)
export class Rule {

    @bindable rule;

    constructor (eventAggregator, ruleService, userContext, validation) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());

        this.ruleService = ruleService;
        this.subscriptions = [];
        this.rule = {editMode: false, dataSeriesOptionsV1: [], dataSeriesOptionsV2: [] };

        this.periods = [
            {id:0, name: 'Daily'},
            {id:1, name: 'Weekly'}
        ];

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

        this.indicatorDataSeries = [
            {id: 0, name: 'EMA (13) Daily'},
            {id: 1, name: 'EMA (26) Daily'}
        ];

        this.transformFunctions = [
            {id: 0, name: 'First'},
            {id: 1, name: 'Max'},
            {id: 2, name: 'Average'},
            {id: 3, name: 'Summarize'}
        ];
    }

    ruleChanged(rule) {
        if (rule) {
            let newRule = Object.assign({}, rule);
            this.setDataSeries(newRule);
            this.rule = newRule;

            this.rule.editMode = false;

            ValidationRules
                .ensure(u => u.name).required({message: "^Rule name must be set"})
                .ensure(u => u.description).required({message: "^Description must be set"})
                .ensure(u => u.skipItemsV1).required().satisfies(value => value >= 0)
                .ensure(u => u.skipItemsV2).required().satisfies(value => value >= 0)
                .ensure(u => u.takeItemsV1).required().satisfies(value => value >= 0)
                .ensure(u => u.takeItemsV2).required().satisfies(value => value >= 0)
                .on(this.rule);

        }
    }  

    onDataSourceV1Change(){
        this.setDataSeries(this.rule);
    }

    onDataSourceV2Change(){
        this.setDataSeries(this.rule);
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
        this.originalRule = Object.assign({}, this.rule);
        this.rule.editMode = true;
    }

    cancelEdit() {
        this.rule = this.originalRule;
        this.rule.editMode = false;
    }

    trySaveRule() {
        this.validation.validate()
            .then(response => {
                let r = response;
            })
            .catch(error => {
                let e = error;
            });    
    }

    saveRule(){
        alert('saved')
    }
}