using System.Collections.Generic;
using System.Linq;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;
using dream.walker.data.Enums;

namespace dream.walker.indicators
{

    /// <summary>
    /// period = 20 days, 65 days and 356 days
    /// </summary>
    public class Nhnl : IIndicator<IndicatorModel, NHNLPeriod>
    {
        public List<IndicatorModel> Calculate(List<QuotesModel> quotes, NHNLPeriod period)
        {
            if (!Validate(quotes, period))
            {
                return null;
            }

            var result = new List<IndicatorModel>();

            for (int index = ((int)period)-1; index < quotes.Count; index++)
            {
                var periodQuotes = quotes.Skip(index - ((int) period) - 1).Take((int) period).ToList();
                var latestQuotes = periodQuotes.First();
                var isNewHigh = periodQuotes.Skip(1).All(q => q.Close < latestQuotes.Close) ? 1: 0;
                var isNewLow = periodQuotes.Skip(1).All(q => q.Close > latestQuotes.Close) ? -1 : 0;

                result.Insert(0, new IndicatorModel { Date = latestQuotes.Date, Value = isNewHigh + isNewLow });
            }

            return result;
        }

        private bool Validate(List<QuotesModel> quotes, NHNLPeriod period)
        {
            if (quotes == null || quotes.Count <= (int)period)
            {
                return false;
            }
            return true;
        }

        public override string ToString()
        {
            return $"NH-NL";
        }
    }
}
