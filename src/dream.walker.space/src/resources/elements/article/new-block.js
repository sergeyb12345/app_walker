import {bindable} from 'aurelia-framework';

export class NewBlock {
    @bindable block;

    constructor () {
        this.blockTypes = ['Heading','Image','OrderedList','Paragraph'];
    }

}