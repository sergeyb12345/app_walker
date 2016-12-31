import * as toastr from "toastr";
import moment from 'moment';
import {inject} from "aurelia-framework";
import {Navigation} from "./navigation";
import {StrategyService} from '../services/strategy-service';
import {CompanyService} from '../services/company-service';

@inject(Navigation, StrategyService, CompanyService, "Settings")
export class StrategyPlayground {
    
    constructor (strategyNavigation, strategyService, companyService, settings) {

        this.strategyNavigation = strategyNavigation;
        this.strategyService = strategyService;
        this.companyService = companyService;
        this.periods = settings.periods;

        this.strategy = {};
        this.company = {};
        this.strategyUrl = '';
        this.searchCriteria = '';
        this.companies= [];
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

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

                        this.loadPlayground(this.strategy.strategyId);

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
        this.router.navigate(url);
    }


    updateCompany(ticker) {
        
    }

    loadPlayground() {
        
    }
}