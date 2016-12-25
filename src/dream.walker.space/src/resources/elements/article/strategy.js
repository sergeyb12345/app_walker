import * as toastr from "toastr";
import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Strategy {
    @bindable strategy;

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.subscriptions = [];
        this.editMode = false;
        this.article = {};
    }

    strategyChanged(strategy) {
        if (strategy) {
            this.article = Object.assign({}, strategy);
        }
    }  

    startEdit() {
        this.originalArticle = Object.assign({}, this.article);
        this.setEditMode(true);
    }

    cancelEdit() {
        this.article = this.originalArticle;
        this.setEditMode(false);
    }

    saveArticle() {
        let isEditing = false;

        this.article.blocks.forEach(function(block) {
            if (block.isEditing === true) {
                isEditing = true;
            }
        });

        if (isEditing !== true) {
            this.eventAggregator.publish('save-article', this.article);
        } else {
            toastr.warning('Some block are in edit mode. Apply changes to those blocks first.', 'Validation error');
        }
    }


    setEditMode (editMode) {
        if (this.article) {
            this.editMode = editMode;

            this.article.blocks.forEach(function(block) {
                block.editMode = editMode;
                if (editMode !== true) {
                    block.isEditing = false;
                }
            });
        }
    }

    addBlock() {
        if (!this.article.blocks) {
            this.article.blocks = [];
        }
        
        let block = {
            isNew: true,
            BlockId:0,
            OrderId: 0,
            Text: ''
        };

        this.article.blocks.push(block);
    }

    moveBlockUp(block) {
    }

    moveBlockDown(block) {
    }

    attached() {
            this.subscriptions.push(
                this.eventAggregator.subscribe('start-edit-article', flag => this.startEdit()));

            this.subscriptions.push(
                this.eventAggregator.subscribe('cancel-edit-article', flag => this.cancelEdit()));

            this.subscriptions.push(
                this.eventAggregator.subscribe('try-save-article', flag => this.saveArticle()));


            this.subscriptions.push(
                this.eventAggregator.subscribe('move-block-up', block => this.moveBlockUp(block)));

            this.subscriptions.push(
                this.eventAggregator.subscribe('move-block-down', block => this.moveBlockDown(block)));

    }

    detached() {
        this.unsubscribe();
    }
    
    unsubscribe() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }
}