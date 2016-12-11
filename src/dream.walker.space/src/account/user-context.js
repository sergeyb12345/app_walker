import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, EventAggregator)
export class UserContext {

    constructor (httpClient, eventAggregator) {
        httpClient.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('api/');

        });

        this.http = httpClient;
        this.eventAggregator = eventAggregator;
        this.user = {};
    }


    initialize() {
        return this.http.fetch("account/user")
            .then(response => {
                return response.json().then(user => {
                    this.user = user;
                });
            })
            .catch(error => {
                this.handleError(error, "initialize");
            });
    }


    login(username, password) {
        let loginRequest = {
            Email: username,
            Password: password,
            RememberMe: true
        };

        return this.http.fetch("account/login",
            {
                method: 'post',
                body: json(loginRequest)
            })
            .then(response => {
                return response.json()
                    .then(result => {
                        if (result.status === 0) {
                            this.user = result.user;
                        }
                        return result.status;
                    });
            })
            .catch(error => {
                return this.handleError(error, "login");
            });
    }

    logout() {
        return this.http.fetch("account/logout",
            {
                method: 'post'
            })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return this.handleError(error, "logout");
            });
    }

    update(user) {
        let updateRequest = {
            Username : user.username,
            FirstName: user.firstName
        };

        return this.http.fetch("account/update",
            {
                method: 'put',
                body: json(updateRequest)
            })
            .then(response => {
                return response.json()
                    .then(result => {
                        if (result.status === 0) {
                            this.user = result.user;
                        }
                        return result.status;
                    });
            })
            .catch(error => {
                return this.handleError(error, "update");
            });
    }

    handleError(error,  source) {
        let exception = {
            source: "UserContext->" + source,
            exception: error
        }
        this.eventAggregator.publish('GeneralExceptions', exception);
        return error;
    }
}