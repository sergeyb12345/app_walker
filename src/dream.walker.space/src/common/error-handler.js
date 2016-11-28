import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator, "ErrorParser")
export class ErrorHandler {

    constructor(eventAggregator, errorParser) {
        this.errorParser = errorParser;

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

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.logError(errorInfo);
            });
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