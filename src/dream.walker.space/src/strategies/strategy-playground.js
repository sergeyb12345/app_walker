import * as toastr from "toastr";
import moment from 'moment';
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';
import {CompanyService} from '../services/company-service';
import {StockService} from '../services/stock-service';
import {PlaygroundService} from '../services/playground-service';

@inject(Navigation, StrategyService, CompanyService, StockService, PlaygroundService, "Settings")
export class StrategyPlayground {
    
    constructor (strategyNavigation, strategyService, companyService, stockService, playgroundService, settings) {

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

        if (params.ticker) {
            this.companyService.getCompany(params.ticker)
                .then(company => {
                    this.company = company;
                });
        }

        if (params.strategyUrl) {

            this.strategyService.getSummaryByUrl(params.strategyUrl)
                .then(data => {
                    if (data && data.strategyId) {
                        this.strategy = data;
                        this.strategyUrl = params.strategyUrl;
                        this.strategyNavigation.configureNavigation(this.strategyUrl);

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

    loadPlayground() {

        this.playgroundService.loadPlayground(this.company.ticker, this.strategy.strategyId, 130)
                .then(data => {
                    if (data && data.company) {
                        this.playgroundModel = data;
                        this.playgroundLoaded = true;

                    } else {
                        toastr.error(`Failed to load playground for company ${this.company.name}`, 'Load Playground Failed');
                    }
                });

    }
}