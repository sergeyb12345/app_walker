using System.Collections.Generic;
using dream.walker.data.Entities;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.station.Processors.Calculators
{
    public interface IIndicatorCalculator
    {
        bool CanCalculate(Indicator indicator);
        List<IndicatorModel> Calculate(Indicator indicator, List<QuotesModel> quotes);
    }
}