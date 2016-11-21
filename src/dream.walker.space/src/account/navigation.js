
export class Navigation {

    configureRouter(config, router) {
        config.title = 'Login';

        config.map([
            { route: ['', 'login'], moduleId: "./login", name: "account-login", title: "Login", nav: false },
            { route: ['edit'], moduleId: "./edit", name: "account-edit", title: "Edit Profile", nav: true, auth: true },
            { route: ['view'], moduleId: "./view", name: "account-view", title: "View Profile", nav: true, auth: true }
        ]);

        this.router = router;
        this.section = config.title;
    }
}

