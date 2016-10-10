$.vobcoCharts.themes['dark'] = {
    'backgroundColor': '#000000', //charts background color
    'gridColor': 'rgba(0, 90, 50, 0.5)', //color of grid lines
    'resizeTriangleColor': '#666666', //background color of resize triangles, they're visible in lower left corner of grid
    'textColor': '#cccccc', //default text color
    'backgroundTextColor': 'rgba(255, 255, 255, 0.2)',//background color for text, currently only for ticker and currency...
    'copyrightTextColor': '#666', //text color for copyright info
    'indicators':
        {
            'OHLC':
                {
                    'seriesColors': ['#ff0000', '#666666', '#00ff00'],//colors for OHLC [negative, neutral, positive]
                    'textColors': ['#ccc', '#ccc', '#ccc', '#ccc'],//text colors displayed on tooltip for [open, high, low, close]...
                },
            'Area':
                {
                    'seriesColors': ['#ff9900', '#dddddd'],//gradient color,[bottom,top]
                    'textColors': ['#ccc'],
                },
            'volume':
                {
                    'seriesColors': ['#ff0000', '#666666', '#00ff00'],//[negative, neutral, positive]
                    'textColors': ['#ccc'],
                },
            'SMA':
                {
                    'seriesColors': ['#ff0000'],
                },
            'EMA':
                {
                    'seriesColors': ['#226600'],
                },
            'williamsR':
                {
                    'seriesColors': ['#ccc'],
                },
            'RSI':
                {
                    'seriesColors': ['#ccc'],
                },
            'bollingerBands':
                {
                    'seriesColors': ['#0000ff'],
                },
            'ADX':
                {
                    'seriesColors': ['#00cc00', '#ff0000', '#0000ff'],
                },
            'ATR':
                {
                    'seriesColors': ['#0000CC'],
                },
            'momentum':
                {
                    'seriesColors': ['#226600'],
                },
            'TRIX':
                {
                    'seriesColors': ['#ccc'],
                },
            'fastStochastic':
                {
                    'seriesColors': ['#0000cc', '#cc0000'],
                },
            'slowStochastic':
                {
                    'seriesColors': ['#0000cc', '#cc0000'],
                },
            'MACD':
                {
                    'seriesColors': ['#22ffff', '#2222ff'], //[MACD,EMA]
                },
            'MACDHistogram':
                {
                    'seriesColors': ['#990000', '#006600'],
                },
            'MAE':
                {
                    'seriesColors': ['#ff0000', '#0000ff', '#0000ff'],
                },
			'ParabolicSAR':
                {
                    'seriesColors': ['#ffffff']
                },
            'TSI':
                {
                    'seriesColors': ['#ffffff']
                },
            'DC':
                {
                    'seriesColors': ['#ffffff', '#ffffff', '#999999']
                },
            'Aroon':
                {
                    'seriesColors': ['#22ffff', '#ffaa00'],
                },
            'compare':
                {
                    'seriesColors': ['#ccc', '#ff0000', '#0000cc'],
                },
            'portfolioValue':
                {
                    'seriesColors': ['#fff']
                },
            'investments':
                {
                    'seriesColors': ['#fff']
                },
            'capitalGain':
                {
                    'seriesColors': ['#fff']
                }

        },
    'tooltip': {
        'textColor': '#666666',
        'borderColor': '#ccc',
        'backgroundColor': "rgba(50, 50, 50, 0.8)",
        'width': 160,
        'crossColor': "rgba(100, 100, 100, 0.6)",
        'showTooltip': true,
        'tooltipType': 1,//1->default,2->static,3->out of chart
        'showCross': true
    },
    'YValue':
        {
            'showYValue': true,
            'backgroundColor': '#333',
            'borderColor': '#009955',
            'textColor': '#fff',
            'width': 37,
            'height': 20
        },
    'chartsDefaults':
        {
            'lineColor': '#ccc',
            'Close': '#ccc',
            'Area1': '#dddddd'
        },
    'navigatorPanel':
        {
            'chartBackgroundColor': '#222',
            'chartBorderColor': '#333',
            'gridColor': '#444',
            'textColor': '#ccc',
            'selectedArea':
                {
                    'backgroundColor': 'rgba(100, 100, 100, 0.5)',
                    'borderColor': 'rgba(51, 51, 51, 0.5)',
                    'scroolbarBackgroundColor': '#CCCCCC',
                    'scroolbarBorderColor': '#666666'
                }
        },
    'rangeButtons':
        {
            'textColor': '#000',
            'borderColoe': '#ccc',
            'backgroundColor': '#666'
        },
        'icons': {
            'addIndicator': '../img/add2.png'
        }
};