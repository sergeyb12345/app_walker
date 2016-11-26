import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ErrorHandler {

    constructor(eventAggregator) {
        eventAggregator.subscribe("GeneralExceptions", error => this.handleError(error));    

        this.lastError =
        {
            client : {
                source: "",
                message: ""
            },
            server : {
                source:"",
                message:""
            }
           
        }
    }


    parseErrorFromStream(stream) {

        var promise = new Promise(
            function (resolve, reject) { // (A)

                let result = {
                    source:"",
                    message: ""
                }

                try {

                    let reader = stream.getReader();

                    reader.read()
                        .then(function(result) {

                            let enc = new TextDecoder();
                            let message = enc.decode(result.value);

                            try {
                                let json = JSON.parse(message);

                                result.message = json.Message;
                                result.source = json.Source;

                            } catch (e) {
                                result.message = message;
                            }

                            resolve(result);
                        })
                        .catch(err => {
                            reject(err);
                        });

                } catch (e) {
                    reject(e);
                }

            });

        return promise;


    }


    handleError(error) {
        let errorInfo = {
            client : {
                source: "",
                message: ""
            },
            server : {
                source:"",
                message:"",
            }
        }

        if (error.source) {
            errorInfo.client.source = error.source;
        }

        if (error.message) {
            errorInfo.client.message = error.message;
        }

        if (error.exception) {
            let self = this;

            this.parseErrorFromStream(error.exception.body)
                .then(serverError => {
                    errorInfo.server.source = serverError.source;
                    errorInfo.server.message = serverError.message;

                    self.logError(errorInfo);
                })
                .catch(error => {
                    errorInfo.server.message = "Failed to extract server message";
                    self.logError(errorInfo);
                });

        } else {
            if (errorInfo.client.source.length === 0 && errorInfo.client.message.length === 0) {
                errorInfo.client.message = error;
            }

            this.logError(errorInfo);
        }
    }

    getLastError() {
        return this.lastError;
    }


    logError (errorInfo) {
        this.lastError = errorInfo;

        let logger = `${errorInfo.client.source} (${errorInfo.server.source})`;
        console.error(`ERROR [${logger}] ${errorInfo.client.message} SERVER: ${errorInfo.server.message}`);
    }
}