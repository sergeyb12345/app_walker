export class Navigation {

    configureRouter(config, router) {
        config.title = 'Login';


        config.map([
            { route: ['','login'], moduleId: "./login", name:"list", title: "Login", nav:false }
        ]);

        this.router = router;
        this.section = config.title;
    }
}