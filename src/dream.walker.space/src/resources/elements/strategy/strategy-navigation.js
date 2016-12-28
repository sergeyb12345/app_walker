import {inject, bindable} from "aurelia-framework";

export class StrategyNavigation {
    @bindable items;

    constructor () {
    }

    itemsChanged(newValue) {
        let v = newValue;
    }
}