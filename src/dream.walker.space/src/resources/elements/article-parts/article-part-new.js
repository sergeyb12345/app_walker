import {inject, bindable} from "aurelia-framework";
import partTypes from  "./part-types";

export class ArticlePartNew {
    @bindable part;

    constructor () {
        this.partTypes = partTypes.types;
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
        this.part.type = partTypes.deleted;
    }
}