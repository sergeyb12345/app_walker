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
        let table = anychart.data.table("date");
        table.addData(this.model.periods[0].quotes);

        let chart = anychart.stock();
        let mapping = table.mapAs({'open':"open", 'high': "high", 'low': "low", 'close': "close"});
        let series = chart.plot(0).ohlc(mapping);
        series.name(this.model.company.name + ' (' + this.model.periods[0].name + ')');

        ////let emaData = anychart.data.table("Date");
        ////emaData.addData(this.data.indicators[0].values);

        ////let emaPlot = chart.plot(0);
        ////let emaMapping = emaData.mapAs({"value": "Value"});
        ////var emaSeries = emaPlot.line(emaMapping);
        ////emaSeries.name(this.data.indicators[0].name);

        chart.plot(0).grid(0).enabled(true);
        chart.plot(0).grid(0).stroke("#EEE");

        let volumePlot = chart.plot(1);
        let volumeMapping = table.mapAs({"value":"volume"});

        volumePlot.column(volumeMapping).name("Volume");
        volumePlot.height('30%');

          //chart.plot(0).grid(0).evenFill("#FFF 0.6");
          //chart.plot(0).grid(0).oddFill("#FFF 0.6");

        // set chart background
          var background = chart.background();
          //background.fill({
          //    src: "//static.anychart.com/images/underwater.jpg",
          //    mode: acgraph.vector.ImageFillMode.FIT_MAX
          //});

        chart.container('container');
        chart.draw();
    }
}