export class Navigation {

    configureRouter(config, router) {
        config.title = 'Strategies';


        config.map([
            { route: ['','list'], moduleId: "./list", name:"list", title: "Strategies", nav:true },
            { route: ['create'], moduleId: "./create", name:"create", title: "Create New Strategy", nav:true }
        ]);

        this.router = router;
        this.section = config.title;
    }
}