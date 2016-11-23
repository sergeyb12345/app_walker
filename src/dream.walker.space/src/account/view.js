
import {inject} from "aurelia-framework";

@inject("User")
export class View {

    constructor(userContext) {
        this.user = userContext.user;
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;
    }


    edit() {
        this.router.navigate("edit");
    }
}