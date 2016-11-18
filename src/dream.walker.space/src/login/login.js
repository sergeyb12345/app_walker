import {UserService} from '../services/user-service';
import {inject,bindable} from "aurelia-framework";
import {Router} from 'aurelia-router';
import {UserContext} from '../common/user-context';

@inject(UserService, Router, UserContext)
export class Login {

    constructor(userService, router, userContext) {
        this.userService = userService;
        this.router = router;
        this.userContext = userContext;

        this.username = '';
        this.password = '';
    }

    login() {
        this.userService.login(this.username, this.password)
            .then(result => {
                if (result === 0) {
                    this.userContext.user.isAuthenticated = true;
                    this.router.navigate("strategies");
                }
            });
    }
}