using System.Collections.Generic;
using System.Linq;
using dream.walker.indicators.Extensions;
using dream.walker.indicators.IndicatorParams;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{
    /*
        Calculation: 

        Green Price Bar: (13-period EMA > previous 13-period EMA) and 
                         (MACD-Histogram > previous period's MACD-Histogram)

        Red Price Bar: (13-period EMA < previous 13-period EMA) and 
                       (MACD-Histogram < previous period's MACD-Histogram)

        Price bars are colored blue when conditions for a Red Price Bar or 
        Green Price Bar are not met. The MACD-Histogram is based on MACD(12,26,9). 
    */

    /// <summary>
    ///  The Impulse System is based on two indicators, a 13-day exponential moving average and the MACD-Histogram. 
    ///  The moving average identifies the trend, while the MACD-Histogram measures momentum.
    /// </summary>
    public class ImpulseSystem : IIndicator<ImpulseSystemModel, ImpulseSystemParams>
    {
        public List<ImpulseSystemModel> Calculate(List<QuotesModel> quotes, ImpulseSystemParams inputParams)
        {
            var macdHist = new Macd().Calculate(quotes, inputParams.MacdParams);
            var ema = new Ema().Calculate(quotes, inputParams.EmaPeriod);
            var impulseData = (from h in macdHist
                         join e in ema
                         on h.Date equals e.Date
                         select new ImpulseData { Date = h.Date, Histogram = h.Histogram, Ema = e.Value})
                    .ToList();

            return impulseData.AsImpulseSystemModel();
        }

    }
}
