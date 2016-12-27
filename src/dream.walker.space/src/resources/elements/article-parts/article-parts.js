import {inject, bindable} from "aurelia-framework";
import partTypes from  "./part-types";
import partActions from  "./part-actions";
import articleEvents from  "./article-events";
import {BindingEngine} from 'aurelia-binding';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(BindingEngine, EventAggregator)
export class ArticleParts {
    @bindable parts;

    constructor (bindingEngine, eventAggregator) {
        this.parts = [];
        this.partType = partTypes;
        this.partAction = partActions;
        this.events = articleEvents;
        this.editMode = false;
        this.bindingEngine = bindingEngine;
        this.eventAggregator = eventAggregator;

        this.partsSubscriptions = [];
        this.partsChangedSubscription = null;
        this.eventSubscriptions = [];
    }

    attached() {
        this.eventSubscriptions.push(
            this.eventAggregator.subscribe(this.events.subscribed.onEditModeChanged, flag => this.setEditMode(flag)));

    }

    setEditMode(flag) {
        this.editMode = flag;
        if (this.parts) {
            this.parts.forEach(function(item) {
                item.editMode = flag;
            });
        }
    }

    partsChanged(newValue) {
        if (newValue ) {
            if( !this.partsChangedSubscription) {
                this.partsChangedSubscription = this.bindingEngine.collectionObserver(this.parts).subscribe(splices => this.onPartsChanged(splices));
            }   

            this.renewPartsSubscriptions();
        }
    }

    detached() {
        if (this.partsChangedSubscription) {
            this.partsChangedSubscription.dispose();
        }

        if (this.eventSubscriptions.length > 0) {
            this.eventSubscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }        
        
        if (this.partsSubscriptions.length > 0) {
            this.partsSubscriptions.forEach(function(subscription) {
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
            case this.partAction.moveDown:
                this.movePartDown();
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
        let index = this.parts.findIndex(p => p.action === this.partAction.moveUp);
        if(index > 0) {
            this.parts.splice(index - 1, 0, this.parts.splice(index, 1)[0]);
            this.parts[index - 1].action = this.partAction.unset;
        }
    }

    movePartDown() {
        let index = this.parts.findIndex(p => p.action === this.partAction.moveDown);
        if(index > -1 && index < this.parts.length - 1) {
            this.parts.splice(index + 1, 0, this.parts.splice(index, 1)[0]);
            this.parts[index + 1].action = this.partAction.unset;
        }
    }


}