import {inject} from "aurelia-framework";
import {RedirectToRoute } from 'aurelia-router';

@inject("User", "Settings")
export class App {

    constructor(userContext, settings) {
        this.isAuthenticated = userContext.user.isAuthenticated;
        this.homePage = settings.homePage;
        this.router = null;
    }

    configureRouter(config, router) {

        config.title = 'Dream Space';
        config.options.pushState = true;

        this.router = router;
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            { route: ["account"], moduleId: "account/navigation", name:"account", title: "Login", nav: false },
            { route: ["studies"], moduleId: "studies/navigation", name:"studies", title: "Studies", nav:true },
            { route: ["strategies"], moduleId: "strategies/navigation", name:"strategies", title: "Strategies", auth: true , nav:this.isAuthenticated },
            { route: '', redirect: this.homePage }

        ]);

    }
}


@inject("User", "Settings")
class AuthorizeStep {

    constructor(userContext, settings) {
        this.isAuthenticated = userContext.user.isAuthenticated;
        this.homePage = settings.homePage;
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