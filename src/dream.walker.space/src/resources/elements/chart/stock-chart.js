import 'npm-anystock';
import {bindable} from 'aurelia-framework';

export class StockChart {
    
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


        this.data = {
            company: {
                name: 'ACME Corp.',
                quotes: [
{"Date":"2016-12-30T00:00:00","Close":45.560001,"Volume":1215100.0,"Open":45.759998,"High":45.82,"Low":45.380001,"VolumeAsText":"1215100"},{"Date":"2016-12-29T00:00:00","Close":45.639999,"Volume":891000.0,"Open":45.68,"High":46.00,"Low":45.57,"VolumeAsText":"891000"},{"Date":"2016-12-28T00:00:00","Close":45.720001,"Volume":1164400.0,"Open":46.509998,"High":46.700001,"Low":45.68,"VolumeAsText":"1164400"},{"Date":"2016-12-27T00:00:00","Close":46.509998,"Volume":1535500.0,"Open":46.369999,"High":46.66,"Low":46.32,"VolumeAsText":"1535500"},{"Date":"2016-12-23T00:00:00","Close":46.200001,"Volume":727700.0,"Open":46.080002,"High":46.23,"Low":45.93,"VolumeAsText":"727700"},{"Date":"2016-12-22T00:00:00","Close":45.970001,"Volume":968300.0,"Open":45.93,"High":46.130001,"Low":45.799999,"VolumeAsText":"968300"},{"Date":"2016-12-21T00:00:00","Close":46.040001,"Volume":1652300.0,"Open":46.209999,"High":46.360001,"Low":45.860001,"VolumeAsText":"1652300"},{"Date":"2016-12-20T00:00:00","Close":46.209999,"Volume":1552400.0,"Open":45.75,"High":46.310001,"Low":45.540001,"VolumeAsText":"1552400"},{"Date":"2016-12-19T00:00:00","Close":45.43,"Volume":1084200.0,"Open":45.889999,"High":46.220001,"Low":45.360001,"VolumeAsText":"1084200"},{"Date":"2016-12-16T00:00:00","Close":45.91,"Volume":2103200.0,"Open":46.610001,"High":46.919998,"Low":45.810001,"VolumeAsText":"2103200"},{"Date":"2016-12-15T00:00:00","Close":46.560001,"Volume":1338900.0,"Open":46.080002,"High":46.77,"Low":45.919998,"VolumeAsText":"1338900"},{"Date":"2016-12-14T00:00:00","Close":46.139999,"Volume":2044100.0,"Open":46.43,"High":46.790001,"Low":46.00,"VolumeAsText":"2044100"},{"Date":"2016-12-13T00:00:00","Close":46.389999,"Volume":1734700.0,"Open":46.310001,"High":46.610001,"Low":46.16,"VolumeAsText":"1734700"},{"Date":"2016-12-12T00:00:00","Close":46.139999,"Volume":1851500.0,"Open":46.18,"High":46.75,"Low":46.110001,"VolumeAsText":"1851500"},{"Date":"2016-12-09T00:00:00","Close":46.299999,"Volume":1937500.0,"Open":45.91,"High":46.32,"Low":45.849998,"VolumeAsText":"1937500"},{"Date":"2016-12-08T00:00:00","Close":45.799999,"Volume":1848400.0,"Open":44.990002,"High":45.830002,"Low":44.77,"VolumeAsText":"1848400"},{"Date":"2016-12-07T00:00:00","Close":44.990002,"Volume":1815200.0,"Open":44.560001,"High":44.990002,"Low":44.110001,"VolumeAsText":"1815200"},{"Date":"2016-12-06T00:00:00","Close":44.84,"Volume":1136700.0,"Open":44.580002,"High":44.900002,"Low":44.200001,"VolumeAsText":"1136700"},{"Date":"2016-12-05T00:00:00","Close":44.529999,"Volume":2495000.0,"Open":44.209999,"High":44.689999,"Low":44.209999,"VolumeAsText":"2495000"},{"Date":"2016-12-02T00:00:00","Close":44.029999,"Volume":2153200.0,"Open":43.27,"High":44.09,"Low":43.27,"VolumeAsText":"2153200"},{"Date":"2016-12-01T00:00:00","Close":43.209999,"Volume":2823100.0,"Open":44.080002,"High":44.099998,"Low":42.919998,"VolumeAsText":"2823100"}
                ]
            },
            indicators: [
                {
                    name: 'EMA(13)',
                    values: [
{"Date":"2016-12-30T00:00:00","Value":45.560001},{"Date":"2016-12-29T00:00:00","Value":45.639999},{"Date":"2016-12-28T00:00:00","Value":45.720001},{"Date":"2016-12-27T00:00:00","Value":46.509998},{"Date":"2016-12-23T00:00:00","Value":46.200001},{"Date":"2016-12-22T00:00:00","Value":45.970001},{"Date":"2016-12-21T00:00:00","Value":46.040001},{"Date":"2016-12-20T00:00:00","Value":46.209999},{"Date":"2016-12-19T00:00:00","Value":45.43},{"Date":"2016-12-16T00:00:00","Value":45.91},{"Date":"2016-12-15T00:00:00","Value":46.560001},{"Date":"2016-12-14T00:00:00","Value":46.139999},{"Date":"2016-12-13T00:00:00","Value":46.389999},{"Date":"2016-12-12T00:00:00","Value":46.139999},{"Date":"2016-12-09T00:00:00","Value":46.299999},{"Date":"2016-12-08T00:00:00","Value":45.799999},{"Date":"2016-12-07T00:00:00","Value":44.990002},{"Date":"2016-12-06T00:00:00","Value":44.84},{"Date":"2016-12-05T00:00:00","Value":44.529999},{"Date":"2016-12-02T00:00:00","Value":44.029999},{"Date":"2016-12-01T00:00:00","Value":43.209999}
                    ]
                }
            ]
        }
    }
    //@bindable data;

    attached() {
        this.drawChart();
    }

    dataChanged(newValue) {
        if (this.data) {
            this.drawChart();
        }
    }

    drawChart() {
        let table = anychart.data.table("Date");
        table.addData(this.data.company.quotes);

        let chart = anychart.stock();
        let mapping = table.mapAs({'open':"Open", 'high': "High", 'low': "Low", 'close': "Close"});
        let series = chart.plot(0).ohlc(mapping);
        series.name(this.data.company.name);

        let emaData = anychart.data.table("Date");
        emaData.addData(this.data.indicators[0].values);

        let emaPlot = chart.plot(0);
        let emaMapping = emaData.mapAs({"value": "Value"});
        var emaSeries = emaPlot.line(emaMapping);
        emaSeries.name(this.data.indicators[0].name);

          chart.plot(0).grid(0).enabled(true);
          chart.plot(0).grid(0).stroke("#EEE");
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