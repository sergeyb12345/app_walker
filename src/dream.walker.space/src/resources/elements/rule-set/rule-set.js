import * as toastr from "toastr";
import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {RuleSetService} from '../../../services/rule-set-service';
import {RuleService} from '../../../services/rule-service';
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation"
import {BootstrapFormRenderer} from "../../../common/bootstrap-form-renderer"

@inject(EventAggregator, RuleSetService, RuleService, "User", ValidationController, "Settings", "ErrorParser")
export class RuleSet {

    @bindable ruleset;

    constructor (eventAggregator, ruleSetService, ruleService, userContext, validation, globalSettings, errorParser) {
        this.powerUser = userContext.user.isAuthenticated;
        this.eventAggregator = eventAggregator;
        this.globalSettings = globalSettings;
        this.ruleService = ruleService;
        this.errorParser = errorParser;
        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());
        this.errors =[];
        this.ruleSetService = ruleSetService;
        this.subscriptions = [];
        this.periods = this.globalSettings.periods;
        this.rules = []; 
        this.attachedRuleId = 0;
        this.attachedRule = {ruleId: 0};

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

    addRule() {
        this.ruleSetInfo.isAdding = !!!this.ruleSetInfo.isAdding;
        if(this.ruleSetInfo.isAdding && this.rules.length === 0) {
            
            let self = this;

            this.ruleService.getRulesForPeriod(this.ruleSetInfo.period)
                .then(response => {
                    self.rules = response;        
                    if(self.rules.length > 0) {
                        self.attachedRule = self.rules[0];
                    }
                })
                .catch(error => {
                    toastr.error("Failed to get rules", "ruleService.getRulesForPeriod");
                });            
        }
    }

    onRuleChange() {
        this.attachedRule = this.rules.find(item => item.ruleId === this.attachedRuleId);
    }

    cancelAddRule() {
        this.ruleSetInfo.isAdding = false;
    }

    confirmAddRule() {
        this.ruleSetInfo.isAdding = false;
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

    moveRuleUp(rule) {
        if(rule && rule.ruleId) {
            let index = this.ruleSetInfo.rules.findIndex(item => item.ruleId === rule.ruleId);
            if(index > 0) {
                this.ruleSetInfo.rules.splice(index-1,0,this.ruleSetInfo.rules.splice(index,1)[0]);
            }
        }
    }

    moveRuleDown(rule) {
        if(rule && rule.ruleId) {
            let index = this.ruleSetInfo.rules.findIndex(item => item.ruleId === rule.ruleId);
            if(index > -1 && index < this.ruleSetInfo.rules.length - 1) {
                this.ruleSetInfo.rules.splice(index+1,0,this.ruleSetInfo.rules.splice(index,1)[0]);
            }
        }
    }


    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }

    detached() {
        this.unsubscribe();
    }
    
    unsubscribe() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    attached() {

        this.subscriptions.push(
            this.eventAggregator.subscribe('rule-set-item-up-' + this.ruleset.ruleSetId, rule => this.moveRuleUp(rule)));

        this.subscriptions.push(
            this.eventAggregator.subscribe('rule-set-item-down-' + this.ruleset.ruleSetId, rule => this.moveRuleDown(rule)));

    }

}