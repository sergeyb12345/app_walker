import {bindable} from 'aurelia-framework';

export class HeadingBlock {
    @bindable block;

    constructor() {
        this.headingTypes = ['H1','H2','H3','H4','H5'];
    }
}