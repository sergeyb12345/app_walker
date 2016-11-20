import {inject,bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';
import {UserContext} from '../common/user-context';
//import {DOM} from 'aurelia-pal'

@inject(Router, UserContext)
export class Login {

    constructor(router, userContext ) {
        this.router = router;
        this.userContext = userContext;

        this.username = '';
        this.password = '';
    }

    login() {
        this.userContext.login(this.username, this.password)
            .then(result => {
                if (result === 0) {
                    let url = this.router.generate("strategies");
                    window.location.href = url;
                }
            })
        .catch(error => {
            return this.handleError(error);
        });
    }

    handleError(error) {
        this.eventAggregator.publish('GeneralExceptions', error);
    }
}