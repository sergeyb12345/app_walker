import {inject, bindable} from "aurelia-framework";
import partActions from  "./part-actions";

export class ArticlePartActions {
    @bindable part;

    constructor() {
        this.partAction = partActions;
    }

    remove() {
        if (this.part) {
            this.part.action = this.partAction.remove;
        }
    }
    moveUp() {
        if (this.part) {
            this.part.action = this.partAction.moveUp;
        }
    }
    moveDown() {
        if (this.part) {
            this.part.action = this.partAction.moveDown;
        }
    }
}