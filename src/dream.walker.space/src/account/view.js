
import {inject} from "aurelia-framework";
import {UserContext} from './user-context';

@inject(UserContext)
export class View {

    constructor(userContext) {
        this.user = userContext.user;
    }

    acttivate() {
        
    }
}