export class Navigation {

    configureRouter(config, router) {
        config.title = 'Strategies';


        config.map([
            { route: ['','list'], moduleId: "./list", name:"strategy-list", title: "Strategies", nav:true },
            { route: ['create'], moduleId: "./create", name:"strategy-create", title: "Create Strategy", nav:false, auth: true },
            { route: ['edit','edit/:strategy'], moduleId: "./edit", name:"strategy-edit", title: "Modify Strategy", nav:false, auth: true },
            { route: ['rules','rules/:period'], moduleId: "./rules/rules", name:"manage-rules", title: "Manage Rules", nav:true, auth: true },
            { route: ['rule-sets', 'rule-sets/:period'], moduleId: "./rules/rule-sets", name:"manage-rule-sets", title: "Manage Rule Sets", nav:true, auth: true },
            { route: ['indicators', 'indicators/:period'], moduleId: "./indicators/indicators", name:"manage-indicators", title: "Manage Indicators", nav:true, auth: true }
        ]);

        this.router = router;
        this.section = config.title;
    }
}