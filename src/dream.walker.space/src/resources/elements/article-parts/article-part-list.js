import {inject, bindable, BindingEngine} from "aurelia-framework";

@inject(BindingEngine)
export class ArticlePartList {
    
    @bindable part;

    constructor (bindingEngine) {
        this.bindingEngine = bindingEngine;
        this.itemsSubscriptions = [];
        this.itemsChangedSubscription = null;
    }

    partChanged(newValue) {
        if (newValue ) {

            if (!this.part.items) {
                this.part.items = [];
            }

            if (this.part.items.length === 0) {
                this.addItem();
            }

            if( !this.itemsChangedSubscription) {
                this.itemsChangedSubscription = this.bindingEngine.collectionObserver(this.part.items)
                    .subscribe(splices => this.onItemsChanged(splices));
            }   

            this.renewItemsSubscriptions();
        }
    }

    addItem() {
        this.part.items.push({ text: '' });
    }
    
    deleteItem(index) {
        this.part.items.splice(index, 1);
    }

    onItemsChanged(splices) {
        this.renewItemsSubscriptions();
    }

    renewItemsSubscriptions() {
        if (this.itemsSubscriptions.length > 0) {
            this.itemsSubscriptions.forEach(function(subscription) {
                subscription.dispose();
            });

            this.itemsSubscriptions = [];
        }    

        if (this.part.items  && this.part.items.length > 0) {
            let self = this;

            this.part.items.forEach(function(item) {
                self.itemsSubscriptions.push(
                    self.bindingEngine.propertyObserver(item, 'text')
                        .subscribe((newValue, oldValue) => self.onItemTextChange(newValue)));
            });
        }

        this.validate();
    }

    onItemTextChange() {
        this.validate();
    }

    validate() {
        let valid = false;
        if (this.part.items && this.part.items.length > 0) {
            this.part.items.forEach(function(item) {
                item.valid = item.text && item.text.length > 0;
            });

            valid = this.part.items.findIndex(i => !i.valid) === -1;
        }
        this.part.valid = valid;
    }

    detached() {
        if (this.itemsChangedSubscription) {
            this.itemsChangedSubscription.dispose();
        }

        if (this.itemsSubscriptions.length > 0) {
            this.itemsSubscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }
}