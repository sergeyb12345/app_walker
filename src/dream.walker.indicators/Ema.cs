using System;
using System.Collections.Generic;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{
    /*
    Use the following steps to calculate a 22 day EMA:

    1) Start by calculating 'k' for the given timeframe. 2 / (22 + 1) = 0,0869
    2) Add the closing prices for the first 22 days together and divide them by 22.
    3) You’re now ready to start getting the first EMA day by taking the following day’s (day 23) closing price multiplied by k, then multiply the previous day’s moving average by (1-k) and add the two.
    4) Do step 3 over and over for each day that follows to get the full range of EMA.

    */


    /// <summary>
    /// EMA = Price(t) * k + EMA(y) * (1 – k)
    /// where: t = today, y = yesterday, N = number of days in EMA, k = 2/(N+1)
    /// </summary>
    public class Ema : IIndicator<EmaModel, int>
    {
        public List<EmaModel> Calculate(List<QuotesModel> quotes, int period)
        {
            if (!Validate(quotes, period))
            {
                return null;
            }

            var result = new List<EmaModel>();
            var queue = new Queue<QuotesModel>(quotes);

            var yesterdayEma = CalcInitialEma(period, queue);

            foreach (var item in queue)
            {
                var ema = CalculateEma(item.Close, period, yesterdayEma);
                result.Add(new EmaModel {Date = item.Date, Value = ema});
                yesterdayEma = ema;
            }

            return result;
        }

        private bool Validate(List<QuotesModel> quotes, int period)
        {
            if (period < 2 || quotes == null || quotes.Count <= period)
            {
                return false;
            }
            return true;
        }

        private decimal CalculateEma(decimal closePrice, int period, decimal yesterdayEma)
        {
            var k = Convert.ToDecimal(2.0 / (period + 1));
            var ema = closePrice * k + yesterdayEma * (1 - k);
            return ema;
        }

        /// <summary>
        ///  Initial EMA = SUM[period](Close) / period
        /// </summary>
        /// <param name="period"></param>
        /// <param name="queue"></param>
        /// <returns></returns>
        private decimal CalcInitialEma(int period, Queue<QuotesModel> queue)
        {
            decimal yesterdayEma = 0;
            for (int i = 0; i < period; i++)
            {
                yesterdayEma += queue.Dequeue().Close;
            }
            return yesterdayEma / period;
        }

    }
}
