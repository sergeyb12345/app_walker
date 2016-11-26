
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, inject} from 'aurelia-framework';

@inject(EventAggregator)
export class BlockActions {
    @bindable block;

    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
        this.moveBlockUpChannel = 'move-block-up';
        this.moveBlockDownChannel = 'move-block-down';
    }

    blockChanged(newValue, oldValue) {
        if(this.requiresAction()) {
            //this.subscriptions.push(
            //    this.eventAggregator.subscribe("apply-changes-"+newValue.BlockId, block => {
            //        block.isEditing = false;
            //    })
            // );
        }
    }

    startEditing () {
        this.block.isEditing = true;
    }
    
    startDeleting () {
        this.block.isDeleting = true;
    }
    

    cancelEditing() {
        this.block.isEditing = false;
        this.block.isDeleting = false;
    }    
    
    addBlock() {
        if (this.block.BlockType !== 'Select') {
            this.block.isNew = false;
            this.block.isEditing = true;
        }
    }

    deleteBlock() {
        this.block.deleted = true;
        this.block.isDeleting = false;

        let blockDeletedChannel = 'delete-block';
        this.eventAggregator.publish(blockDeletedChannel, this.block);
    }

    applyChanges() {
        if(this.requiresAction()) {
            let channel = 'article-block-' + this.block.BlockId;
            this.eventAggregator.publish(channel, true);
        } else {
            this.block.isEditing = false;
        }
    }

    requiresAction() {
        return this.block.Items
            || this.block.BlockType === 'Image'
            || this.block.BlockType === 'OrderedList';
    }

    moveUp() {
        this.eventAggregator.publish(this.moveBlockUpChannel, this.block);
    }

    moveDown() {
        this.eventAggregator.publish(this.moveBlockDownChannel, this.block);
    }
}