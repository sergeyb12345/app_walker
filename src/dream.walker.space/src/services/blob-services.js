import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class BlobServices {
    

    constructor (http, eventAggregator) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.eventAggregator = eventAggregator;
        this.http = http;
    }

    
    post(fileName, fileBody) {
        let payload = {
            fileName: fileName,
            fileBody: fileBody
        };

        return this.http.fetch('blob/upload', {
            method: 'post',
            body:json(payload)
            })
        .then(response => response.json())
        .catch(error => {
            return this.handleError(error, "post");
        });
    }

    
    handleError(error,  source) {
        let exception = {
            source: "BlobServices->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}