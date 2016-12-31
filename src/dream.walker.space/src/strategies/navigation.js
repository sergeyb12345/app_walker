import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Navigation {

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.strategyChangedEvent = 'onStrategyChanged';
    }

    configureRouter(config, router) {
        config.title = 'Strategies';


        config.map([
            { route: ['','strategy/:strategyUrl'], moduleId: "./strategy", name:"strategy", title: "Strategy", nav:true },
            { route: ['rules','rules/:period'], moduleId: "./rules/rules", name:"manage-rules", title: "Manage Rules", nav:false, auth: true },
            { route: ['rule-sets', 'rule-sets/:period'], moduleId: "./rules/rule-sets", name:"manage-rule-sets", title: "Manage Rule Sets", nav:false, auth: true },
            { route: ['strategy-rule-sets', 'strategy-rule-sets/:strategyUrl'], moduleId: "./strategy-rule-sets", name:"strategy-rule-sets", title: "Strategy Rule Sets", nav:false, auth: true },
            { route: ['strategy-playground', 'strategy-playground/:strategyUrl', 'strategy-playground/:strategyUrl/:ticker'], moduleId: "./strategy-playground", name:"strategy-playground", title: "Strategy Playground", nav:false, auth: true },
            { route: ['indicators', 'indicators/:period'], moduleId: "./indicators/indicators", name:"manage-indicators", title: "Manage Indicators", nav:false, auth: true }
        ]);

        this.router = router;
        this.section = config.title;
    }

    configureNavigation(url) {
        this.url = url;
        this.eventAggregator.publish(this.strategyChangedEvent, url);
    }

    attached() {
        this.eventAggregator.publish(this.strategyChangedEvent, this.url);
    }
}