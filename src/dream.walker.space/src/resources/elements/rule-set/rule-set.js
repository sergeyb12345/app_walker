import * as toastr from "toastr";
import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleSetService} from '../../../services/rule-set-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../../../common/bootstrap-form-renderer"

@inject(EventAggregator, RuleSetService, "User", ValidationController, "Settings", "ErrorParser")
export class RuleSet {

    @bindable ruleset;

    constructor (eventAggregator, ruleSetService, userContext, validation, globalSettings, errorParser) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.globalSettings = globalSettings;
        this.errorParser = errorParser;
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());
        this.errors =[];
        this.ruleSetService = ruleSetService;
        this.subscriptions = [];
        this.periods = this.globalSettings.periods;
    }

    rulesetChanged(ruleSetItem) {
        if (ruleSetItem) {
            let newRule = Object.assign({}, ruleSetItem);
            this.ruleSetInfo = newRule;
        }
    }  

    onExpanded() {
        this.ruleSetInfo.expanded = !!!this.ruleSetInfo.expanded;
        if(this.ruleSetInfo.expanded !== true && this.ruleSetInfo.ruleSetId > 0 && this.ruleSetInfo.editMode === true) {
            this.cancelEdit();
        }
    }


    startEdit() {
        this.originalRuleSet = Object.assign({}, this.ruleSetInfo);
        this.ruleSetInfo.editMode = true;

        ValidationRules
            .ensure('name').displayName('Rule Set Name').required().withMessage(`\${$displayName} cannot be blank.`)
            .ensure('description').displayName('Description').required().withMessage(`\${$displayName} cannot be blank.`)
            .on(this.ruleSetInfo);

    }

    cancelEdit() {
        if(this.ruleSetInfo.ruleSetId > 0) {
            this.ruleSetInfo = this.originalRuleSet;
            this.ruleSetInfo.editMode = false;
        } else {
            this.ruleSetInfo.deleted = true;
        }
        this.validation.reset();
    }

    cancelDelete() {
        this.ruleSetInfo.deleteMode = false;
        this.ruleSetInfo.expanded = false;
    }

    startDelete() {
        this.ruleSetInfo.deleteMode = true;
        this.ruleSetInfo.expanded = true;
    }

    confirmDelete() {
        this.ruleSetService.deleteRuleSet(this.ruleSetInfo.ruleSetId) 
            .then(response => {
                this.ruleSetInfo.deleted = true;
                toastr.success(`Rule set ${this.ruleSetInfo.description} deleted successfully!`, 'Rule Set Deleted');
            })
            .catch(error => {
                this.handleError(error);
                toastr.error("Failed to delete rule set", "Error");
            });    
    }

    trysaveRuleSet() {
        this.validation.validate()
            .then(response => {
                if(response.valid === true) {
                    this.saveRuleSet();
                } else {
                    toastr.warning('Please correct validation errors.', 'Validation Errors')
                }
            })
            .catch(error => {
                this.handleError(error);
            });    
    }

    saveRuleSet() {
        this.errors = [];
        this.ruleSetService.saveRuleSet(this.ruleSetInfo) 
            .then(response => {
                this.ruleSetInfo.editMode = false;
                this.ruleSetInfo.expanded = false;
                toastr.success(`Rule set ${response.name} saved successfully!`, 'Rule set Saved');
            })
            .catch(error => {
                this.handleError(error);
                toastr.error("Failed to save rule set", "Error");
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