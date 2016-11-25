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
            this.channel = 'article-block-' + this.block.blockId;
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
                            .then(content => {
                                self.block.imageUrl = content.imageUrl;
                                self.block.isEditing = false;
                            });
                    }
                });
                reader.readAsDataURL(file);

            }
        }
    }

    isValidBlock() {
        return this.block.blockType === 'Image';
    }

    blobToUrl(blob) {
        this.subscribe();
        return URL.createObjectURL(blob);
    }
}


export class BlobToUrlValueConverter {  
    toView(blob) {
        this.imageUrl = URL.createObjectURL(blob);
        return this.imageUrl;
    }
}

export class FileListToArrayValueConverter {  
    toView(fileList) {
        let files = [];
        if (!fileList) {
            return files;
        }
        for(let i = 0; i < fileList.length; i++) {
            files.push(fileList.item(i));
        }
        return files;
    }
}