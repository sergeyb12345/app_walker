import {inject, bindable, BindingEngine} from "aurelia-framework";

@inject(BindingEngine)
export class ArticlePartHeading {
    @bindable part;

    constructor (bindingEngine) {
        this.headingTypes = ['H1','H2','H3','H4','H5'];
        this.textValid = true;
        this.typeValid = true;
        this.bindingEngine = bindingEngine;
        this.subscriptions = [];
    }

    attached() {
        if (!this.part.headingType) {
            this.part.headingType = '';
        }

        if (!this.part.text) {
            this.part.text = '';
        }

        this.subscriptions.push(this.bindingEngine.propertyObserver(this.part, 'text')
            .subscribe((newValue, oldValue) => this.onChange()));

        this.validate();
    }


    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }

    }

    onChange() {
        this.validate();
    }    
    
    validate() {
        this.typeValid = this.part.headingType.length === 2;
        this.textValid = this.part.text.length > 0;

        this.part.valid = this.typeValid && this.textValid;
    }
}