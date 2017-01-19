import 'npm-anystock';
import {bindable} from 'aurelia-framework';

export class StockChart {
    @bindable model;

    modelChanged(newValue) {
        
    }

    attached() {
        if(this.model && this.model.company) {
            this.drawChart();
        }
    }

    constructor () {
        this.data2 = {
            company: {
                name: 'A - ACMA'
            },
            periods: [
                {
                    id: 1,
                    name: 'weekly',
                    quotes: [],
                    indicators: [
                        {
                            name: 'EMA(13)',
                            values: []
                        }
                    ],
                    update: {
                        mode: 'reset',
                        bars: 0
                    }
                },
                {
                    id: 0,
                    name: 'daily',
                    quotes: [],
                    indicators: [],
                    update: {
                        mode: 'insert | append',
                        bars: 2
                    }
                }
            ]
        };
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
            series.name(self.model.company.name + ' (' + period.name + ')');

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

            ////let emaData = anychart.data.table("Date");
            ////emaData.addData(this.data.indicators[0].values);

            ////let emaPlot = chart.plot(0);
            ////let emaMapping = emaData.mapAs({"value": "Value"});
            ////var emaSeries = emaPlot.line(emaMapping);
            ////emaSeries.name(this.data.indicators[0].name);


            let volumePlot = chart.plot(1+plotNumber);
            let volumeMapping = table.mapAs({"value":"volume"});

            volumePlot.column(volumeMapping).name("Volume");
            volumePlot.height('30%');

            chart.container('container-'+ period.name);
            chart.draw();
        });

    }
}