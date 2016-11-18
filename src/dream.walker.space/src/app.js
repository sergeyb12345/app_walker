import {inject} from "aurelia-framework";
import {RedirectToRoute } from 'aurelia-router';
import {UserContext} from './common/user-context';

@inject(UserContext)
export class App {

    constructor(userContext) {
        userContext.initialize()
            .then(result => {
                return;
            });
    }

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


@inject(UserContext)
class AuthorizeStep {

    constructor(userContext) {
        this.isAuthenticated = userContext.user.isAuthenticated;
    }

    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {

            if (this.isAuthenticated) {
                return next();
            } else {
                return next.cancel(new RedirectToRoute('login'));
            }
        } else {
            return next();
        }
    }

}