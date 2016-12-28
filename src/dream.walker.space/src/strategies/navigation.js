export class Navigation {

    constructor () {
        this.items = [];
    }

    configureRouter(config, router) {
        config.title = 'Strategies';


        config.map([
            { route: ['','strategy/:strategyUrl'], moduleId: "./strategy", name:"strategy-list", title: "Strategy", nav:true },
            { route: ['rules','rules/:period'], moduleId: "./rules/rules", name:"manage-rules", title: "Manage Rules", nav:false, auth: true },
            { route: ['rule-sets', 'rule-sets/:period'], moduleId: "./rules/rule-sets", name:"manage-rule-sets", title: "Manage Rule Sets", nav:false, auth: true },
            { route: ['strategy-rule-sets', 'strategy-rule-sets/:strategyUrl'], moduleId: "./strategy-rule-sets", name:"strategy-rule-sets", title: "Strategy Rule Sets", nav:false, auth: true },
            { route: ['indicators', 'indicators/:period'], moduleId: "./indicators/indicators", name:"manage-indicators", title: "Manage Indicators", nav:false, auth: true }
        ]);

        this.router = router;
        this.section = config.title;
    }
}