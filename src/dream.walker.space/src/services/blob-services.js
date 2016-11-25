import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class BlobServices {
    

    constructor (http) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.http = http;
    }

    
    post(fileName, fileBody) {
        let payload = {
            fileName: fileName,
            fileBody: fileBody
        };

        return this.http.fetch('blob', {
            method: 'post',
            body:json(payload)
            })
        .then(response => response.json());
    }
}