using System;
using System.Collections.Generic;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{
    public class Rsi : IIndicator<RsiModel, int>
    {
        public List<RsiModel> Calculate(List<QuotesModel> quotes, int period)
        {
            return null;
        }
    }


    public class RsiModel : IIndicatorModel
    {
        public DateTime Date { get; set; }
    }
}
