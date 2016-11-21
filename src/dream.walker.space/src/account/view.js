
import {inject} from "aurelia-framework";
import {UserContext} from './user-context';
import {Router} from 'aurelia-router';

@inject(UserContext, Router)
export class View {

    constructor(userContext, router) {
        this.user = userContext.user;
        this.router = router;
    }

    acttivate() {
        
    }

    edit() {
        this.router.navigate("edit");
    }
}