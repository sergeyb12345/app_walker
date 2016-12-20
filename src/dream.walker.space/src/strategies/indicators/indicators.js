import {inject} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {IndicatorService} from '../../services/indicator-service';

@inject(EventAggregator, IndicatorService, "ErrorParser", "Settings")
export class Indicators {

    constructor (eventAggregator, indicatorService, errorParser, globalSettings) {

        this.errorParser = errorParser;
        this.eventAggregator = eventAggregator;
        this.indicatorService = indicatorService;
        this.globalSettings = globalSettings;
        this.subscriptions = [];
        this.errors = [];
        this.indicators = [];

        this.activePeriod = this.globalSettings.defaultPeriod;
        this.periods = this.globalSettings.periods;
    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;

        if (params.period) {
            this.activePeriod = this.activatePeriod(params.period);
            this.loadIndicators(this.activePeriod.id);

        } else {
            let defaultUrl = '/strategies/indicators/' + this.activePeriod.url;
            this.router.navigate(defaultUrl);
        }
        
    }
    
    activatePeriod(periodUrl) {

        this.periods.forEach(function(element) {
            element.active = false;
        });
        
        let result = {};

        let index = this.periods.findIndex(i => i.url.toLowerCase() === periodUrl.toLowerCase());
        if(index === -1) {
            result = this.defaultPeriod;
        }
        result = this.periods[index];
        result.active = true;

        return result;
    }

    addIndicator() {
        let indicator = {
            isNew: true,
            expanded: true,
            description: 'New Indicator',
            period: this.activePeriod.id,
            editMode: true,
            indicatorId: 0,
            chartColor: '#000000',
            chartPlotNumber: 0,
            chartType: 2 //Line
        };

        this.indicators.push(indicator);
    }

    loadIndicatorsForPeriod (period){
        let url = `/strategies/indicators/${period.url}`;
        this.router.navigate(url);
    }

    isPeriodActive(period) {
        return period.id === this.activePeriod.id;
    }

    loadIndicators(periodId) {

        this.indicatorService.getIndicatorsForPeriod(periodId)
            .then(result => {
                this.indicators = result;
            })
            .catch(error => {
                return this.handleError(error, "loadIndicators");
            });     
    }

    handleError(error) {
        let self = this;

        this.errorParser.parseError(error)
            .then(errorInfo => {
                self.errors.push(errorInfo);
            });
    }

}