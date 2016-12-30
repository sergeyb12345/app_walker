import {inject, bindable} from "aurelia-framework";
import { Router } from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
export class StrategyNavigation {
    @bindable strategychangedevent;

    constructor (router, eventAggregator) {
        this.router = router;
        this.eventAggregator = eventAggregator;
        this.subscription = null;
        this.items = [];
    }

    strategychangedeventChanged(newValue) {
        if (this.subscription) {
            this.subscription.dispose();
        }

        this.subscription = this.eventAggregator.subscribe(newValue, url => this.onStrategyChanged(url));
    }

    detached() {
        if (this.subscription) {
            this.subscription.dispose();
        }
    }

    onStrategyChanged (url) {
        let currentModuleName = this.router.currentInstruction.config.name;
        this.items = [];

        let strategyMenuItem =
        {
            isActive: currentModuleName === 'strategy',
            title: 'Strategy Article',
            url: '/strategies/strategy/' + url,
            name: 'strategy'
        }

        let rulesetsMenuItem = {
            isActive: currentModuleName === 'strategy-rule-sets',
            title: 'Strategy Rule Sets',
            url: '/strategies/strategy-rule-sets/' + url,
            name: 'rule-sets'
        }

        let playgroundMenuItem = {
            isActive: currentModuleName === 'strategy-playground',
            title: 'Playground',
            url: '/strategies/strategy-playground/' + url,
            name: 'strategy-playground'
        }

        this.items.push(strategyMenuItem);
        this.items.push(rulesetsMenuItem);
        this.items.push(playgroundMenuItem);
    }

}