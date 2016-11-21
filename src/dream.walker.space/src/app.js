import {inject} from "aurelia-framework";
import {RedirectToRoute } from 'aurelia-router';
import {UserContext} from './account/user-context';

export class App {

    configureRouter(config, router) {

        config.title = 'Dream Space';
        config.options.pushState = true;

        this.router = router;
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            { route: ["account"], moduleId: "account/navigation", name:"account", title: "Login", nav: false },
            { route: ["strategies"], moduleId: "strategies/navigation", name:"strategies", title: "Strategies", auth: true , nav:true },
            { route: '', redirect: 'strategies' }

        ]);

    }
}


@inject(UserContext, "homePage")
class AuthorizeStep {

    constructor(userContext, homePage) {
        this.isAuthenticated = userContext.user.isAuthenticated;
        this.homePage = homePage;
    }

    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {

            if (this.isAuthenticated) {
                return next();
            } else {
                return next.cancel(new RedirectToRoute('account'));
            }
        } else {
            if (navigationInstruction.getAllInstructions()
                .some(i => i.config.name === 'account-login' && this.isAuthenticated)) {
                return next.cancel(new RedirectToRoute(this.homePage));
            }
            return next();
        }
    }

}