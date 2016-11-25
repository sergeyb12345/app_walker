import {inject} from "aurelia-framework";
import {RedirectToRoute } from 'aurelia-router';

@inject("Settings")
export class App {

    constructor(settings) {
        this.homePage = settings.homePage;
    }

    configureRouter(config, router) {

        config.title = 'Dream Space';
        config.options.pushState = true;

        this.router = router;
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            { route: ["account"], moduleId: "account/navigation", name:"account", title: "Login", nav: false },
            { route: ["strategies"], moduleId: "strategies/navigation", name:"strategies", title: "Strategies", auth: true , nav:true },
            { route: ["studies"], moduleId: "studies/navigation", name:"studies", title: "Studies", nav:true },
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