import 'npm-anystock';
import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class StockChart {
    @bindable model;

    constructor (eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.eventSubscriptions = [];
    }

    modelChanged(newValue) {
        
    }

    attached() {
        this.eventSubscriptions.push(
            this.eventAggregator.subscribe('StrategyPlayground.loadPrev', data => this.loadPrev(data)));

        this.eventSubscriptions.push(
            this.eventAggregator.subscribe('StrategyPlayground.loadNext', data => this.loadNext(data)));

        if(this.model && this.model.company) {
            this.drawChart();
        }
    }

    detached() {
        if (this.eventSubscriptions.length > 0) {
            this.eventSubscriptions.forEach(function(subscription) {
                subscription.dispose();
            });
        }        
    }

    loadPrev(data) {
        
    }

    loadNext(data) {
        //data.periods.forEach(function(period) {
        //    table.addData(period.quotes);
        //    table.remove();
        //});
    }


    drawChart() {
        let self = this;

        this.model.periods.forEach(function(period) {
            let plotNumber = 0;
            let chart = anychart.stock();
            let table = anychart.data.table("date");
            table.addData(period.quotes);

            let mapping = table.mapAs({'open':"open", 'high': "high", 'low': "low", 'close': "close"});
            let series = chart.plot(plotNumber).ohlc(mapping);
            let seriesName = self.model.company.name + ' (' + period.name + ')';
            series.name(seriesName);
            series.id(period.name);

            let legend = series.legendItem();
            legend.text(seriesName);

            chart.plot(plotNumber).grid(0).enabled(true);
            chart.plot(plotNumber).grid(0).stroke("#EEE");

            period.indicators.forEach(function(indicator){
                let indicatorPlot = chart.plot(plotNumber);
                let indicatorData = anychart.data.table("date");
                indicatorData.addData(indicator.values);
                let indicatorMapping = indicatorData.mapAs({"value": "value"});
                var indicatorSeries = indicatorPlot.line(indicatorMapping);
                indicatorSeries.name(indicator.name);
            });

            let volumePlot = chart.plot(1+plotNumber);
            let volumeMapping = table.mapAs({"value":"volume"});

            volumePlot.column(volumeMapping).name("Volume");
            volumePlot.height('30%');

            chart.title(seriesName);
            chart.container('container-'+ period.name);
            chart.draw();
        });

    }
}