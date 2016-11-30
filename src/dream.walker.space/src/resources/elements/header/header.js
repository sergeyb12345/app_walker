import {inject} from "aurelia-framework";

@inject("User", "Settings")
export class Header {

    constructor(userContext, settings) {
        this.userContext = userContext;
        this.settings = settings;
    }
}