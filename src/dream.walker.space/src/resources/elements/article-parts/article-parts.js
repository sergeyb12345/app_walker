import {inject, bindable} from "aurelia-framework";
import partTypes from  "./part-types";

export class ArticleParts {
    @bindable parts;

    constructor () {
        this.parts = [];
        this.partType = partTypes;
        this.editMode = true;
    }

    addPart() {
        let part = {
            type: this.partType.unset,
            editMode: true,
            text:''
        };

        let index = this.parts.findIndex(p => p.type === part.type);
        if (index === -1) {
            this.parts.push(part);
        }
    }

}