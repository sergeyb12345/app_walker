import * as toastr from "toastr";
import moment from 'moment';
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';
import {CompanyService} from '../services/company-service';
import {StockService} from '../services/stock-service';
import {PlaygroundService} from '../services/playground-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Navigation, StrategyService, CompanyService, StockService, PlaygroundService, "Settings", EventAggregator)
export class StrategyPlayground {
    
    constructor (strategyNavigation, strategyService, companyService, stockService, playgroundService, settings, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.playgroundService = playgroundService;
        this.strategyNavigation = strategyNavigation;
        this.strategyService = strategyService;
        this.companyService = companyService;
        this.periods = settings.periods;
        this.stockService = stockService;
        this.playgroundModel = {};
        this.strategy = {};
        this.company = {};
        this.strategyUrl = '';
        this.searchCriteria = '';
        this.companies= [];
        this.chartWeeklyContainer = 'weekly-container';
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;
        this.playgroundLoaded = false;

        if (params.strategyUrl) {

            this.strategyService.getSummaryByUrl(params.strategyUrl)
                .then(data => {
                    if (data && data.strategyId) {
                        this.strategy = data;
                        this.strategyUrl = params.strategyUrl;
                        this.strategyNavigation.configureNavigation(this.strategyUrl);

                        if (params.ticker) {
                            this.companyService.getCompany(params.ticker)
                                .then(company => {
                                    this.company = company;

                                    if (company && company.ticker) {
                                        this.loadPlayground();
                                    }
                                });
                        }

                    } else {
                        toastr.error(`Failed to load summary for url ${params.strategyUrl}`, 'Load Summary Failed');
                    }
                });
        }
    }


    searchCompanies() {
        this.companyService.searchCompanies(this.searchCriteria, 15)
                .then(result => {
                    this.companies = result;
                });
    }

    selectCompany(company) {
        let url = '/strategies/strategy-playground/' + this.strategy.url + '/' + company.ticker.toLowerCase();
        company.expanded = false;
        this.searchMode = false;
        this.playgroundLoaded = false;

        this.router.navigate(url);
    }


    updateCompany(ticker) {
        let self = this;

        this.stockService.updateQuotes(ticker)
            .then(result => {
                if (result.ok) {
                    this.companyService.getCompany(ticker)
                       .then(company => {
                            company.show = true;
                            self.company = company;
                        });                                       
                }
            });
    }

    streamData() {
        let self = this;

        loadNext().then(data => {
            let flag = data;

            setTimeout(function() {
                if (self.streaming && flag) {
                    self.streamData();
                }
            }, 500); 
            
        });

    }

    startStreaming() {
        this.streaming = true;
        this.streamData();
    }

    stopStreaming() {
        this.streaming = false;
    }

    loadPlayground() {

        this.playgroundService.loadPlayground(this.company.ticker, this.strategy.strategyId, 100)
                .then(data => {
                    if (data && data.company) {
                        this.playgroundModel = data;
                        this.playgroundLoaded = true;

                    } else {
                        toastr.error(`Failed to load playground for company ${this.company.name}`, 'Load Playground Failed');
                    }
                });

    }

    loadNext() {
        return this.playgroundService.loadNext(this.company.ticker, this.strategy.strategyId, 100, 1)
            .then(data => {
                if (data && data.company) {
                    this.eventAggregator.publish('StrategyPlayground.loadNext', data);

                    return true;
                } else {
                    toastr.error(`Failed to load next playground data for company ${this.company.name}`, 'Load Next Data Failed');
                    return false;
                }
            })
        .catch(error => {
                return false;
            });
       
    }

    loadPrev() {
        this.playgroundService.loadPrev(this.company.ticker, this.strategy.strategyId, 100, 1)
                .then(data => {
                    if (data && data.company) {
                        this.eventAggregator.publish('StrategyPlayground.loadPrev', data);
                    } else {
                        toastr.error(`Failed to load previous playground data for company ${this.company.name}`, 'Load Previous Data Failed');
                    }
                });
        
    }

}