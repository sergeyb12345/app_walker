using System;
using System.Collections.Generic;
using dream.walker.calculators;
using dream.walker.data.Entities.Indicators;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class IndicatorChartData
    {
        private readonly IIndicatorCalculator _calculator;
        private readonly Indicator _indicator;

        public IndicatorChartData(IIndicatorCalculator calculator, Indicator indicator)
        {
            _calculator = calculator;
            _indicator = indicator;
        }

        public List<IndicatorModel> Values { get; set; }


        public void Calculate(List<QuotesModel> quotes)
        {
            Values = _calculator.Calculate(_indicator, quotes);
        }
    }

    public class IndicatorsChartData : Dictionary<int, IndicatorChartData>
    {
    }
}