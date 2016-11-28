export class Navigation {

    configureRouter(config, router) {
        config.title = 'Strategies';


        config.map([
            { route: ['','list'], moduleId: "./list", name:"strategy-list", title: "Strategies", nav:true },
            { route: ['create'], moduleId: "./create", name:"strategy-create", title: "Create Strategy", nav:true, auth: true },
            { route: ['edit','edit/:strategy'], moduleId: "./edit", name:"strategy-edit", title: "Modify Strategy", nav:false, auth: true }
        ]);

        this.router = router;
        this.section = config.title;
    }
}