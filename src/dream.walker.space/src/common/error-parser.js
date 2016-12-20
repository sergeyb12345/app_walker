export class ErrorParser {

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
                        .then(function(data) {

                            let enc = new TextDecoder();
                            let message = enc.decode(data.value);

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


    parseError(error) {
        let self = this;
        var promise = new Promise(
            function(resolve, reject) { // (A)


                let errorInfo = {
                    client: {
                        source: "",
                        message: ""
                    },
                    server: {
                        source: "",
                        message: ""
                    }
                }

                if (error.source) {
                    errorInfo.client.source = error.source;
                }

                if (error.message) {
                    errorInfo.client.message = error.message;
                }

                if (error.exception) {

                    self.parseErrorFromStream(error.exception.body)
                        .then(serverError => {
                            errorInfo.server.source = serverError.source;
                            errorInfo.server.message = serverError.message;

                            resolve(errorInfo);
                        })
                        .catch(error => {
                            errorInfo.server.message = "Failed to extract server message";
                            resolve(errorInfo);
                        });

                } else {
                    if (errorInfo.client.source.length === 0 && errorInfo.client.message.length === 0) {
                        errorInfo.client.message = error;
                    }

                    resolve(errorInfo);
                }

            });

        return promise;
    }

}