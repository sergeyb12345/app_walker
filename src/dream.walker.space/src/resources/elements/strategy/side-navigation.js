import * as toastr from "toastr";
import {inject, bindable} from "aurelia-framework";
import {StrategyService} from '../../../services/strategy-service';
import { Router } from 'aurelia-router';

@inject(StrategyService, Router)
export class SideNavigation {

    @bindable strategyurl;

    constructor (strategyService, router) {
        this.strategyService = strategyService;
        this.router = router;
        this.currentModuleName = this.router.currentInstruction.config.name;
        this.summaries = [];
    }

    strategyurlChanged(newValue) {

        if (newValue && newValue.length > 0) {

            if (this.summaryNotFound(newValue)) {
                let self = this;
                this.strategyService.getSummaries()
                    .then(data => {
                        self.summaries = data;
                        self.setActiveStrategy(newValue);
                    })
                    .catch(error => {
                        toastr.error('Failed to load summaries', 'Load Summaries Failed');
                    });
            } else {
                this.setActiveStrategy(newValue);
            }
        }
    }


    summaryNotFound(url) {
        let result = true;

        if (this.summaries && this.summaries.length > 0) {
            result = this.summaries.findIndex(s => s.url.toLowerCase() === url.toLowerCase()) === -1;
        }

        return result;
    }

    setActiveStrategy(url) {

        if (this.summaryNotFound(url)) {
            this.navigateToDefaultStrategy();

        } else {

            let self = this;

            if (this.summaries) {
                this.summaries.forEach(function(item) {
                    item.selected = item.url.toLowerCase() === url.toLowerCase();
                });
            }
        }
    }

    navigateToDefaultStrategy() {
        if (this.summaries && this.summaries.length > 0) {
            let strategyUrl = '/strategies/'+this.currentModuleName+'/' + this.summaries[0].url;
            this.router.navigate(strategyUrl);
        } 
    }

    navigateToStrategy(url) {
        if (url && url.length > 0) {
            let strategyUrl = '/strategies/'+this.currentModuleName+'/' + url;
            this.router.navigate(strategyUrl);
        }
    }


}