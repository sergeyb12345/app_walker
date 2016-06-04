using System.Collections.Generic;
using System.Linq;
using dream.walker.indicators.Enums;
using dream.walker.indicators.Extensions;
using dream.walker.indicators.IndicatorParams;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{
    /*
        For any given stock or underlying security:

        1. Calculate a 12 day EMA of closing prices
        2. Calculate a 26 day EMA of closing prices
        3. Subtract the longer EMA in (2) from the shorter EMA in (1)
        4. Calculate a 9 day EMA of the MACD line gotten in (3)
    */

    public class Macd : IIndicator<IndicatorModel, MacdParams>
    {
        public List<IndicatorModel> Calculate(List<QuotesModel> quotes, MacdParams inputParams)
        {
            if (!Validate(quotes, inputParams))
            {
                return null;
            }

            var slowEma = new Ema().Calculate(quotes, inputParams.SlowEmaPeriod);
            var fastEma = new Ema().Calculate(quotes, inputParams.FastEmaPeriod);
            var macdLine = fastEma.Substract(slowEma);
            var signalEma = new Ema().Calculate(macdLine.AsQuotesModel(QuoteModelField.Close), inputParams.SignalEmaPeriod);
            var macdHist = macdLine.Substract(signalEma);

            var result = macdHist.Select(c => new IndicatorModel() {Date = c.Date, Value = c.Value}).ToList();
            
            return result;
        }

        private bool Validate(List<QuotesModel> quotes, MacdParams inputParams)
        {
            if (inputParams.SlowEmaPeriod < 12 || 
                inputParams.FastEmaPeriod < 9 ||
                inputParams.SlowEmaPeriod <= inputParams.FastEmaPeriod ||
                inputParams.SlowEmaPeriod <= inputParams.SignalEmaPeriod ||
                inputParams.FastEmaPeriod <= inputParams.SignalEmaPeriod ||
                quotes == null || 
                quotes.Count <= inputParams.SlowEmaPeriod)
            {
                return false;
            }
            return true;
        }
    }

}
