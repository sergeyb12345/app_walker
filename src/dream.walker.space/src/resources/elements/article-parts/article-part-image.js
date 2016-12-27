import * as toastr from "toastr";
import {bindable, inject} from 'aurelia-framework';
import {BlobServices} from '../../../services/blob-services';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BindingEngine} from 'aurelia-binding';

import $ from 'jquery';

@inject(BlobServices, EventAggregator, BindingEngine)
export class ArticlePartImage {
    @bindable part;

    constructor(blobServices, eventAggregator, bindingEngine) {
        this.blobServices = blobServices;
        this.eventAggregator = eventAggregator;
        this.bindingEngine = bindingEngine;

        this.selectedFiles = [];
        this.subscriptions = [];
    }

    attached() {
        if (!this.part.imageUrl) {
            this.part.imageUrl = '';
        }
        if (!this.part.text) {
            this.part.text = '';
        }

        this.subscriptions.push(this.bindingEngine.propertyObserver(this.part, 'imageUrl')
            .subscribe((newValue, oldValue) => this.validate()));

        this.subscriptions.push(this.bindingEngine.propertyObserver(this.part, 'text')
            .subscribe((newValue, oldValue) => this.validate()));

        this.validate();
    }

    detached() {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }
    }

    validate() {
        this.textValid = this.part.text.length > 0;
        this.imageValid = this.part.imageUrl.length > 4;

        this.part.valid = this.textValid && this.imageValid;
        
    }

    blobToUrl(blob) {
        return URL.createObjectURL(blob);
    }

    uploadImage() {
        if (this.selectedFiles.length > 0) {
            toastr.warning('Uploading selected file', 'Uploading...');

            let reader = new FileReader();
            let file = this.selectedFiles.item(0);
            let self = this;
            reader.addEventListener("loadend", function() {
                if (reader.readyState === 2) {
                    self.blobServices.post(file.name, reader.result)
                        .then(imageUrl => {
                            if (imageUrl) {
                                self.part.imageUrl = imageUrl;
                                toastr.success('Image uploaded successfully', 'Image Uploaded');
                            } else {
                                toastr.error('Sorry, this image is too big. Must be 2MB max.', 'Failed to Uploaded');
                            }

                        })
                        .catch(error => {
                            toastr.error('Failed to upload image', 'Failed to Uploaded');
                            return this.handleError(error, "uploadImage");
                        });
                }
            });
            reader.readAsDataURL(file);
        }
    }

    handleError(error,  source) {
        let exception = {
            source: "ArticlePartImage->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }

}
