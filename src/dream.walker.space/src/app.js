import { RedirectToRoute } from 'aurelia-router';

export class App {

    configureRouter(config, router) {
        config.title = 'Dream Space';
        config.options.pushState = true;

        this.router = router;
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            { route: ["login"], moduleId: "login/navigation", name:"login", title: "Login", nav: false },
            { route: ["strategies"], moduleId: "strategies/navigation", name:"strategies", title: "Strategies", auth: true , nav:true },
            { route: '', redirect: 'strategies' }

        ]);
    }
}


class AuthorizeStep {
    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            var isLoggedIn = /* insert magic here */false;
            if (!isLoggedIn) {
                return next.cancel(new RedirectToRoute('login'));
            }
        }

        return next();
    }
}