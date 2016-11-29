export class Navigation {

    configureRouter(config, router) {
        config.title = 'Strategies';


        config.map([
            { route: ['','list'], moduleId: "./list", name:"defined-rules", title: "Defined Rules", nav:true },
            { route: ['create'], moduleId: "./create", name:"rule-create", title: "Register Rule", nav:true, auth: true },
            { route: ['rules','rules/:strategy'], moduleId: "./strategy-rules", name:"strategy-rules", title: "Manage Strategy Rules", nav:false, auth: true }
        ]);

        this.router = router;
        this.section = config.title;
    }
}