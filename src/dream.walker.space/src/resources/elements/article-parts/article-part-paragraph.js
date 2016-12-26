import {inject, bindable, BindingEngine} from "aurelia-framework";

@inject(BindingEngine)
export class ArticlePartParagraph {
    @bindable part;

    constructor (bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.subscriptions = [];

    }

    attached() {
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
        this.textValid = this.part.text.length > 0;

        this.part.valid = this.textValid;
    }

}