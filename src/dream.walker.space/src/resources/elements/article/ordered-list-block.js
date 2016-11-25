import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, inject} from 'aurelia-framework';
import $ from 'jquery';

@inject(EventAggregator)
export class OrderedListBlock {
    @bindable block;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
        this.subscribed = false;
    }

    blockChanged(newValue, oldValue) {
        if(this.isValidBlock()) {
            this.subscribe();
        }
    }

    subscribe() {
        this.channel = 'article-block-' + this.block.BlockId;
        this.subscriptions.push(this.eventAggregator.subscribe(this.channel, update => this.updateBlock(update)));
        this.subscribed = true;
    }

    updateBlock(update) {
        if(this.isValidBlock()) {
            let block = this.block;
            let items = [];

            let blockId = this.block.BlockId;
            let index = 0;

            this.block.Items.forEach(function(item) {
                let id = blockId + '-' + index;
                items.push($(`#${id}`).val());
                index++;
            });

            block.Items = items;
            //this.eventAggregator.publish("apply-changes-"+blockId, block);
            block.isEditing = false;
        }
    }

    appendItem() {
        if(this.isValidBlock()) {
            if (!this.block.Items) {
                this.block.Items = [];
                if (this.subscribed !== true) {
                    this.subscribe();
                }
            }
            this.block.Items.push('');
        }
    }

    deleteItem(pos) {
        if(this.isValidBlock()) {
            this.block.Items.splice(pos, 1);
        }
    }

    detached() {
        this.subscriptions.forEach(function (subscription) {
            subscription.dispose();
        });
    }

    isValidBlock() {
        return this.block.BlockType === 'OrderedList';
    }
}