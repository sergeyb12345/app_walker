import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BlobServices} from '../../../services/blob-services';
import $ from 'jquery';

@inject(EventAggregator, BlobServices)
export class ImageBlock {
    @bindable block;

    constructor(eventAggregator, blobServices) {
        this.eventAggregator = eventAggregator;
        this.blobServices = blobServices;
        this.selectedFiles = [];
        this.subscriptions = [];
        this.image = [];
        this.subscribed = false;
    }
    blockChanged(newValue, oldValue) {
        if (this.isValidBlock()) {
            this.subscribe();
        }
    }

    subscribe() {
        if (this.subscribed !== true) {
            this.channel = 'article-block-' + this.block.BlockId;
            this.subscriptions.push(this.eventAggregator.subscribe(this.channel, update => this.updateBlock(update)));
            this.subscribed = true;
        }
    }

    updateBlock(update) {
        if (this.isValidBlock()) {

            if (this.selectedFiles.length > 0) {
                let reader = new FileReader();
                let file = this.selectedFiles.item(0);
                let self = this;
                reader.addEventListener("loadend", function() {
                    if (reader.readyState === 2) {
                        self.blobServices.post(file.name, reader.result)
                            .then(imageUrl => {
                                self.block.ImageUrl = imageUrl;
                                self.block.isEditing = false;
                            })
                            .catch(error => {
                                return this.handleError(error, "updateBlock");
                            });
                    }
                });
                reader.readAsDataURL(file);

            }
        }
    }

    isValidBlock() {
        return this.block.BlockType === 'Image';
    }

    blobToUrl(blob) {
        this.subscribe();
        return URL.createObjectURL(blob);
    }

    handleError(error,  source) {
        let exception = {
            source: "ImageBlock->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}

