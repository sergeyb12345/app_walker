import {inject, bindable} from "aurelia-framework";
import partTypes from  "./part-types";
import partActions from  "./part-actions";

export class ArticlePartNew {
    @bindable part;

    constructor () {
        this.partTypes = partTypes.types;
        this.partAction = partActions;

        this.canAdd = false;
        this.selectedType = null;
    }

    onTypeChange() {
        this.canAdd = Number.isInteger(this.selectedType);
    }

    add() {
        this.part.type = this.selectedType;
    }

    cancel() {
        this.part.action = this.partAction.remove;
    }
}