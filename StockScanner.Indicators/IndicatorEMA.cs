using System.Collections.Generic;
using System.Linq;
using StockScanner.Indicators.Entities;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators
{
    /// <summary>
    /// </summary>
    public class IndicatorEMA : IndicatorFormulaBase
    {
        /// <summary>
        /// </summary>
        public enum EnumChartLine
        {
            Ema = 0
        }

        /// <summary>
        /// </summary>
        public enum EnumParamType
        {
            EmaPeriod
        }

        private readonly string _destKey;
        private readonly string _sourceKey;

        public sealed override Dictionary<string, double> IndicatorParams { get; protected set; }
        public sealed override Dictionary<int, string> IndicatorCharts { get; protected set; }


        /// <summary>
        ///     Initializes IndicatorParams & IndicatorCharts
        /// </summary>
        private void Initialize()
        {
            IndicatorParams = new Dictionary<string, double> {{EnumParamType.EmaPeriod.ToString(), 12}};
            IndicatorCharts = new Dictionary<int, string> {{(int) EnumChartLine.Ema, EnumChartLine.Ema.ToString()}};
        }

        /// <summary>
        ///     Calculates the specified period.
        /// </summary>
        /// <param name="period">The period.</param>
        /// <returns></returns>
        public List<ICalculated> Calculate(int period)
        {
            List<ICalculated> result = null;
            if (HistoricalData != null)
                result = Calculate(period, HistoricalData);
            else
                result = Calculate(period, CalculatedData, _sourceKey, _destKey);
            return result;
        }

        /// <summary>
        ///     exponential moving average (EMA), also known as an exponentially weighted moving average
        /// </summary>
        /// <param name="period">time period</param>
        /// <param name="histData">historical data</param>
        /// <returns></returns>
        private List<ICalculated> Calculate(int period, List<IStockQuote> histData)
        {
            var result = new List<ICalculated>();

            if (histData != null && histData.Count > period)
            {
                var prevEma = histData.First().CloseValue;
                ICalculated previous = null;

                for (var i = period; i < histData.Count; i++)
                {
                    var data = histData[i];
                    var ema = 0.0;
                    if (i == period)
                    {
                        for (var j = 0; j < period; j++)
                        {
                            var prevData = histData[i - j];
                            ema += prevData.CloseValue;
                        }
                        ema = ema/(period*1.0);
                    }
                    else
                    {
                        ema = CalculateEma(data.CloseValue, period, prevEma);
                    }


                    result.Add(new Calculated(data.QuoteId, period, data.Date, EnumChartLine.Ema.ToString(), ema,
                        previous));

                    previous = result[result.Count - 1];
                    prevEma = ema;
                }
            }
            return result;
        }


        /// <summary>
        ///     Apply EMA over calculated data
        /// </summary>
        /// <param name="period">EMA Period</param>
        /// <param name="calculatedSet">Calculated result from another IndicatorFormula</param>
        /// <param name="sourceKey">Apply calculations over this key</param>
        /// <param name="destKey">Store calculations into this key</param>
        /// <returns></returns>
        private List<ICalculated> Calculate(int period, List<ICalculated> calculatedSet, string sourceKey,
            string destKey)
        {
            var result = new List<ICalculated>();

            if (calculatedSet != null && calculatedSet.Count > period)
            {
                calculatedSet = calculatedSet.OrderBy(c => c.Date).ToList();
                var prevEma = calculatedSet.First().GetValue(sourceKey);

                for (var i = period; i < calculatedSet.Count; i++)
                {
                    var data = calculatedSet[i];
                    var ema = 0.0;
                    if (i == period)
                    {
                        for (var j = 0; j < period; j++)
                        {
                            var prevData = calculatedSet[i - j];
                            ema += prevData.GetValue(sourceKey);
                        }
                        ema = ema/(period*1.0);
                    }
                    else
                    {
                        ema = CalculateEma(data.GetValue(sourceKey), period, prevEma);
                    }

                    var calc = data.Clone() as ICalculated;

                    calc.SetValue(destKey, ema);

                    result.Add(calc);

                    prevEma = ema;
                }
            }
            return result;
        }


        /// <summary>
        ///     calculate exponential moving average (EMA)
        /// </summary>
        /// <param name="todaysPrice"></param>
        /// <param name="period"></param>
        /// <param name="emaYesterday"></param>
        /// <returns></returns>
        private double CalculateEma(double todaysPrice, int period, double emaYesterday)
        {
            var dPercent = 2.0/(period + 1.0);
            return (todaysPrice - emaYesterday)*dPercent + emaYesterday;
        }

        /// <summary>
        ///     Calculates this instance.
        /// </summary>
        /// <returns></returns>
        public override List<ICalculated> Calculate()
        {
            var fparams = IndicatorParams;
            if (fparams != null && fparams.ContainsKey(EnumParamType.EmaPeriod.ToString()))
            {
                var period = (int) fparams[EnumParamType.EmaPeriod.ToString()];
                if (period > 0)
                    return Calculate(period);
            }

            return null;
        }

        #region Constructors

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorEMA" /> class.
        /// </summary>
        /// <param name="calcList">The calc list.</param>
        /// <param name="sourceKey">The source key.</param>
        /// <param name="destKey">The dest key.</param>
        public IndicatorEMA(List<ICalculated> calcList, string sourceKey, string destKey)
            : base(calcList)
        {
            _sourceKey = sourceKey;
            _destKey = destKey;
            Initialize();
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorEMA" /> class.
        /// </summary>
        /// <param name="stockQuotes">His data.</param>
        public IndicatorEMA(List<IStockQuote> stockQuotes)
            : base(stockQuotes)
        {
            Initialize();
        }

        public IndicatorEMA()
        {
            Initialize();
        }

        #endregion
    }
}