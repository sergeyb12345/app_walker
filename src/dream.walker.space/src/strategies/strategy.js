import * as toastr from "toastr";
import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {StrategyService} from '../services/strategy-service';
import articleEvents from  "../resources/elements/article-parts/article-events";
import {ValidationRules, ValidationController, validateTrigger} from "aurelia-validation";
import {BootstrapFormRenderer} from "../common/bootstrap-form-renderer";
import {Navigation} from "./navigation";

@inject(EventAggregator, StrategyService, "ErrorParser", "User", ValidationController, Navigation)
export class Strategy {

    constructor (eventAggregator, strategyService, errorParser, userContext, validation, strategyNavigation) {
        this.powerUser = userContext.user.isAuthenticated;
        this.errorParser = errorParser;
        this.articleEvents = articleEvents;
        this.eventAggregator = eventAggregator;
        this.strategyService = strategyService;
        this.strategyNavigation = strategyNavigation;

        this.validation = validation;
        this.validation.validateTrigger = validateTrigger.change;
        this.validation.addRenderer(new BootstrapFormRenderer());

        this.subscriptions = [];
        this.editMode = false;
        this.errors = [];
        this.summaries = [];
        this.strategy = {};
    }

    buildStrategyNavigation(strategyUrl) {
        this.strategyNavigation.items = [];

        let strategyMenuItem =
        {
            isActive: true,
            title: 'Strategy Article',
            url: '/strategies/strategy/' + strategyUrl,
            name: 'strategy'
        }

        let rulesetsMenuItem = {
            isActive: false,
            title: 'Strategy Rule Sets',
            url: '/strategies/strategy-rule-sets/' + strategyUrl,
            name: 'rule-sets'
        }

        this.strategyNavigation.items.push(strategyMenuItem);
        this.strategyNavigation.items.push(rulesetsMenuItem);
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        let self = this;
        this.strategyService.getSummaries()
            .then(data => {
                self.summaries = data;
                self.loadStrategy(params.strategyUrl);
            })
            .catch(error => {
                toastr.error('Failed to load summaries', 'Load Summaries Failed');
            });   
    }

    addStrategy() {
        this.strategy = {
            strategyId: 0,
            title: '',
            url: '',
            summary: '',
            active: false,
            deleted: false,
            blocks: []
        };

        this.startEdit();
        this.validation.validate();
    }

    deleteStrategy() {
        let self = this;

        if (this.strategy && this.strategy.strategyId > 0) {
            this.strategyService.deleteStrategy(this.strategy.strategyId)
                .then(response => {
                    toastr.success('Strategy deleted successfully', 'Strategy Deleted');
                    self.setEditMode(false);
                    self.router.navigate('/strategies' );
                })
                .catch(error => {
                    toastr.error('Failed to delete strategy', 'Delete Failed');
                });   

        }
    }

    setActiveStatus(flag) {
        this.strategy.active = flag;
        let summary = this.summaries.find(s => s.strategyId === this.strategy.strategyId);
        if (summary) {
            summary.active = flag;
        }
    }

    navigateToStrategy(url) {
        if (url && url.length > 0) {
            this.setEditMode(false);
            let strategyUrl = '/strategies/strategy/' + url;
            this.router.navigate(strategyUrl);
        }
    }

    loadStrategy(url) {
        let self = this;

        if (url && url.length > 0) {
            this.strategyService.getByUrl(url)
                .then(data => {
                    if (data && data.strategyId) {
                        self.strategy = data;
                        if (!self.strategy.blocks) {
                            self.strategy.blocks = [];
                        }
                        self.selectActiveSummary(data.strategyId);
                        self.buildStrategyNavigation(self.strategy.url);
                    } else {
                        self.navigateToDefaultStrategy();
                    }
                });

        } else {
            this.navigateToDefaultStrategy();
        }
    }

    selectActiveSummary(id) {
        this.summaries.forEach(function(item) {
            item.selected = item.strategyId === id;
        });
    }

    navigateToDefaultStrategy() {
        if (this.summaries && this.summaries.length > 0) {
            let strategyUrl = '/strategies/strategy/' + this.summaries[0].url;
            this.router.navigate(strategyUrl);
        } 
    }

    setEditMode (editMode) {
        this.editMode = editMode;
        this.eventAggregator.publish(this.articleEvents.subscribed.onEditModeChanged, editMode);
    }

    startEdit() {
        this.originalStrategy = Object.assign({}, this.strategy);

        this.setEditMode(true);

        this.validationRules = ValidationRules
                .ensure(u => u.title).displayName('Strategy name').required().withMessage(`\${$displayName} cannot be blank.`)
                .ensure(u => u.summary).displayName('Summary').required().withMessage(`\${$displayName} cannot be blank.`)
                .ensure(u => u.url).displayName('Strategy url').required().withMessage(`\${$displayName} cannot be blank.`)
            .on(this.strategy);

    }

    cancelEdit() {
        this.setEditMode(false);

        if(this.strategy.strategyId > 0) {
            this.strategy = this.originalStrategy;
            this.strategy.editMode = false;
        } else {
            this.strategy.deleted = true;
        }
        this.validation.reset();
    }

    trySaveArticle() {
        this.validation.validate()
            .then(response => {
                let valid = false;
                if(response.valid === true) {
                    if (this.articlePartsValidate()) {
                        valid = true;
                    }
                }
                if (valid) {
                    this.saveStrategy();

                } else {
                    toastr.warning('Please correct validation errors.', 'Validation Errors');
                }
            })
            .catch(error => {
                this.handleError(error);
            });    
    }

    articlePartsValidate() {
        if (this.strategy.blocks.length > 0) {
            let index = this.strategy.blocks.findIndex(b => !b.valid);
            return index === -1;
        } else {
            toastr.warning('Article is empty', 'Validation Errors');
            return false;
        }
    }
    
    saveStrategy() {
        
        let self = this;
        this.setEditMode(false);

        this.strategyService.update(this.strategy)
            .then(data => {
              
                toastr.success(`Strategy staved successfully!`, 'Strategy saved');
                self.navigateToStrategy(this.strategy.url);
            })
            .catch(error => {
                this.setEditMode(true);
                toastr.error(`Failed to save strategy!`, 'Application Error');
            });    
    }

}