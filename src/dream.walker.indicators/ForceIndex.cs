using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{
    /*
            for (var i = 1; i < histData.Count; i++)
                {
                    var item = histData[i];
                    var prevItem = histData[i - 1];

                    calcData.Add(new Calculated(item.QuoteId, period, item.Date, EnumChartLine.ForceIndex.ToString(),
                        (item.CloseValue - prevItem.CloseValue)*item.Volume, previous));

                    previous = calcData[calcData.Count - 1];
                }

                return
                    new IndicatorEMA(calcData, EnumChartLine.ForceIndex.ToString(), EnumChartLine.ForceIndex.ToString())
                        .Calculate(period);
    */


    /// <summary>
    /// 1. (item.CloseValue - prevItem.CloseValue)*item.Volume
    /// 2. Apply EMA (Period)
    /// </summary>
    public class ForceIndex : IIndicator<IndicatorModel, int>
    {
        public string Name => "ForceIndex";

        public List<IndicatorModel> Calculate(List<QuotesModel> quotes, int period)
        {
            if (!Validate(quotes, period))
            {
                return null;
            }

            var result = new List<QuotesModel>();
            var queue = new Queue<QuotesModel>(quotes.OrderBy(c => c.Date).ToList());

            var yesterday = queue.Dequeue();

            foreach (var item in queue)
            {
                var today = item;
                var force = CalculateForce(today.Close, yesterday.Close, today.Volume);

                result.Insert(0, new QuotesModel { Date = item.Date, Close = force });
                yesterday = today;
            }

            var forceIndex = new Ema().Calculate(result, period);
            return forceIndex;

        }


        private bool Validate(List<QuotesModel> quotes, int period)
        {
            if (period < 2 || quotes == null || quotes.Count <= period)
            {
                return false;
            }
            return true;
        }
    
        private decimal CalculateForce(decimal todayClose,  decimal yesterdayClose, decimal todayVolume)
        {
            var force = (todayClose - yesterdayClose) * todayVolume;
            return Math.Round(force, 4);
        }

    }
}
