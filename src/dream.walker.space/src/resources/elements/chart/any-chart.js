﻿import 'npm-anystock';
import {bindable} from 'aurelia-framework';

export class AnyChart {
    @bindable container = 'container';

    constructor() {
    }

    containerChanged(newValue, oldValue) {
        this.draw(newValue);
    }

    generateSome(data) {

    }

    draw(container) {

        anychart.onDocumentReady(function() {


            // defining the chart type
            var chart = anychart.stock();

            var table = anychart.data.table();
            table.addData([
                ['2015-12-24T12:00:00', '511.53', '514.98', '505.79', '506.40'],
                ['2015-12-25T12:00:00', '512.53', '514.88', '505.69', '507.34'],
                ['2015-12-26T12:00:00', '511.83', '514.98', '505.59', '506.23'],
                ['2015-12-27T12:00:00', '511.22', '515.30', '505.49', '506.47'],
                ['2015-12-28T12:00:00', '510.35', '515.72', '505.23', '505.80'],
                ['2015-12-29T12:00:00', '510.53', '515.86', '505.38', '508.25'],
                ['2015-12-30T12:00:00', '511.43', '515.98', '505.66', '507.45'],
                ['2015-12-31T12:00:00', '511.50', '515.33', '505.99', '507.98'],
                ['2016-01-01T12:00:00', '511.32', '514.29', '505.99', '506.37'],
                ['2016-01-02T12:00:00', '511.70', '514.87', '506.18', '506.75'],
                ['2016-01-03T12:00:00', '512.30', '514.78', '505.87', '508.67'],
                ['2016-01-04T12:00:00', '512.50', '514.77', '505.83', '508.35'],
                ['2016-01-05T12:00:00', '511.53', '516.18', '505.91', '509.42'],
                ['2016-01-06T12:00:00', '511.13', '516.01', '506.00', '509.26'],
                ['2016-01-07T12:00:00', '510.93', '516.07', '506.00', '510.99'],
                ['2016-01-08T12:00:00', '510.88', '515.93', '505.22', '509.95'],
                ['2016-01-09T12:00:00', '509.12', '515.97', '505.15', '510.12'],
                ['2016-01-10T12:00:00', '508.53', '516.13', '505.66', '510.42'],
                ['2016-01-11T12:00:00', '508.90', '516.24', '505.73', '510.40']
            ]);

            // mapping the data
            var mapping = table.mapAs();
            mapping.addField('open', 1, 'first');
            mapping.addField('high', 2, 'max');
            mapping.addField('low', 3, 'min');
            mapping.addField('close', 4, 'last');
            mapping.addField('value', 4, 'last');

            // set the series type
            chart.plot(0).ohlc(mapping).name('ACME Corp.');

            /*
            table = anychart.data.table();
table.addData([
['2016-01-01T12:00:00', 1.0860],
['2016-01-04T12:00:00', 1.0832],
['2016-01-05T12:00:00', 1.0780],
['2016-01-06T12:00:00', 1.0781],
['2016-01-07T12:00:00', 1.0936],
['2016-01-08T12:00:00', 1.0932]
]);

// map the data
mapping = table.mapAs();
mapping.addField('value', 1);

var series = chart.plot(1).line(mapping);
series.name("Euro to Dollar Rate");
            */

            
            // setting the chart title
            chart.title('AnyStock Basic Sample');

            chart.container(container);
            chart.draw();

        });
    }


}
