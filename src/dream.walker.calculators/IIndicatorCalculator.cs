using System.Collections.Generic;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;
using dream.walker.data.Entities.Indicators;

namespace dream.walker.calculators
{
    public interface IIndicatorCalculator
    {
        bool CanCalculate(Indicator indicator);
        List<IndicatorModel> Calculate(Indicator indicator, List<QuotesModel> quotes);
    }
}