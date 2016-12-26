import {inject, bindable} from "aurelia-framework";
import partTypes from  "./part-types";
import partActions from  "./part-actions";
import {ObserverLocator} from 'aurelia-binding';
import {BindingEngine} from 'aurelia-binding';

@inject(BindingEngine)
export class ArticleParts {
    @bindable parts;

    constructor (bindingEngine) {
        this.parts = [];
        this.partType = partTypes;
        this.partAction = partActions;
        this.editMode = true;
        this.bindingEngine = bindingEngine;

        this.partsSubscriptions = [];
        this.subscriptions = [];
    }

    attached() {
    }

    partsChanged(newValue) {
        if (newValue && this.subscriptions.length === 0) {
            this.subscriptions.push(
                this.bindingEngine.collectionObserver(this.parts).subscribe(splices => this.onPartsChanged(splices)));
        }
    }

    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }    
    }

    addPart() {
        let part = {
            type: this.partType.unset,
            editMode: true,
            text:'',
            action: this.partAction.unset
        };

        let index = this.parts.findIndex(p => p.type === part.type);
        if (index === -1) {
            this.parts.push(part);
        }
    }
    
    onPartsChanged(splices) {
        this.renewPartsSubscriptions();
    }

    renewPartsSubscriptions() {
        if (this.partsSubscriptions.length > 0) {
            this.partsSubscriptions.forEach(function(subscription) {
                subscription.dispose();
            });

            this.partsSubscriptions = [];
        }    

        if (this.parts  && this.parts.length > 0) {
            let self = this;

            this.parts.forEach(function(item) {
                self.partsSubscriptions.push(
                    self.bindingEngine.propertyObserver(item, 'action')
                        .subscribe((action, oldValue) => self.onPartActionChange(action)));
            });
        }
    }

    onPartActionChange(action) {
        switch (action) {
            case this.partAction.remove:
                this.removeDeletedPart();
            break;
            case this.partAction.moveUp:
                this.movePartUp();
            break;
        default:
        }
    }

    removeDeletedPart() {
        let index = this.parts.findIndex(p => p.action === this.partAction.remove);
        if (index !== -1) {
            this.parts.splice(index, 1);
        }
    }

    movePartUp() {
        
    }

}