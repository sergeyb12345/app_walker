using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Enums;
using dream.walker.data.Extensions;
using dream.walker.indicators;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;
using dream.walker.data.Entities.Indicators;

namespace dream.walker.calculators
{
    public class EmaIndicatorCalculator : IIndicatorCalculator
    {
        private readonly Ema _calculator;
        private List<QuotesModel> _transformedQuotes;
        private int _period;

        public EmaIndicatorCalculator()
        {
            _calculator = new Ema();
        }

        public bool CanCalculate(Indicator indicator)
        {
            return string.Compare(indicator.Name, _calculator.Name, StringComparison.InvariantCultureIgnoreCase) == 0;
        }

        public List<IndicatorModel> Calculate(Indicator indicator, List<QuotesModel> quotes)
        {
            Validate(indicator, quotes);

            return _calculator.Calculate(_transformedQuotes, _period);
        }

        public void Validate(Indicator indicator, List<QuotesModel> quotes)
        {
            if (!CanCalculate(indicator))
            {
                throw new NotSupportedException($"Calculator '{_calculator.Name}' does not support indicator '{indicator.Name}'");
            }

            var param = indicator.Params.FirstOrDefault(p => p.ParamName == IndicatorParamName.Period.ToString());
            if (param == null || param.Value == 0)
            {
                throw new ArgumentException($"Period parameter value is not set. Params: {indicator.JsonParams}");
            }

            _transformedQuotes = quotes.ConvertToPeriod(indicator.Period);
            if (_transformedQuotes.Count < param.Value)
            {
                throw new ArgumentException($"Not enougn data to process indicator '{indicator.Name}' with params: '{indicator.JsonParams}'");
            }

            _period = param.Value;
        }
    }
}