using System.Collections.Generic;
using System.Linq;
using StockScanner.Indicators.Entities;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators
{
    /// <summary>
    /// </summary>
    public class IndicatorSMA : IndicatorFormulaBase
    {
        /// <summary>
        ///     Formula Output result
        /// </summary>
        public enum EnumChartLine
        {
            Sma = 0
        }

        /// <summary>
        ///     Formula Input parameters
        /// </summary>
        public enum EnumParamType
        {
            SmaPeriod
        }

        private readonly string _destKey;
        private readonly string _sourceKey;

        public sealed override Dictionary<string, double> IndicatorParams { get; protected set; }
        public sealed override Dictionary<int, string> IndicatorCharts { get; protected set; }


        /// <summary>
        ///     Initializes IndicatorParams &  IndicatorCharts
        /// </summary>
        private void Initialize()
        {
            IndicatorParams = new Dictionary<string, double> {{EnumParamType.SmaPeriod.ToString(), 0}};
            IndicatorCharts = new Dictionary<int, string> {{(int) EnumChartLine.Sma, EnumChartLine.Sma.ToString()}};
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
        ///     Simpple moving average (SMA)
        /// </summary>
        /// <param name="period">time period</param>
        /// <param name="histData">historical data</param>
        /// <returns></returns>
        private static List<ICalculated> Calculate(int period, List<IStockQuote> histData)
        {
            var result = new List<ICalculated>();

            if (histData != null && histData.Count > period)
            {
                ICalculated previous = null;
                for (var i = period; i <= histData.Count; i++)
                {
                    var sma = histData.Skip(i - period).Take(period).Sum(c => c.CloseValue)/(period*1.0);
                    var data = histData[i - 1];


                    result.Add(new Calculated(data.QuoteId, period, data.Date, EnumChartLine.Sma.ToString(), sma,
                        previous));

                    previous = result[result.Count - 1];
                }
            }
            return result;
        }


        /// <summary>
        ///     Simpple moving average (SMA)
        /// </summary>
        /// <param name="period"></param>
        /// <param name="calculatedSet"></param>
        /// <param name="sourceKey"></param>
        /// <param name="destKey"></param>
        /// <returns></returns>
        private static List<ICalculated> Calculate(int period, List<ICalculated> calculatedSet, string sourceKey,
            string destKey)
        {
            var result = new List<ICalculated>();

            if (calculatedSet != null && calculatedSet.Count > period)
            {
                calculatedSet = calculatedSet.OrderBy(c => c.Date).ToList();
                double prevSma = 0;

                ICalculated previous = null;
                for (var i = period; i <= calculatedSet.Count; i++)
                {
                    var sma = calculatedSet.Skip(i - period).Take(period).Sum(c => c.GetValue(sourceKey))/(period*1.0);
                    var data = calculatedSet[i - 1];

                    if (prevSma == 0)
                        prevSma = sma;

                    var calc = data.Clone() as ICalculated;

                    calc.SetValue(destKey, sma);
                    calc.Previous = previous;

                    previous = calc;

                    result.Add(calc);
                    prevSma = sma;
                }
            }
            return result;
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override List<ICalculated> Calculate()
        {
            var fparams = IndicatorParams;
            if (fparams != null && fparams.ContainsKey(EnumParamType.SmaPeriod.ToString()))
            {
                var period = (int) fparams[EnumParamType.SmaPeriod.ToString()];
                if (period > 0)
                    return Calculate(period);
            }

            return null;
        }

        #region Constructors

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorSMA" /> class.
        /// </summary>
        /// <param name="calculatedData">The calc list.</param>
        /// <param name="sourceKey"></param>
        /// <param name="destKey"></param>
        public IndicatorSMA(List<ICalculated> calculatedData, string sourceKey, string destKey)
            : base(calculatedData)
        {
            _sourceKey = sourceKey;
            _destKey = destKey;
            Initialize();
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorSMA" /> class.
        /// </summary>
        /// <param name="hisData">His data.</param>
        public IndicatorSMA(List<IStockQuote> hisData)
            : base(hisData)
        {
            Initialize();
        }

        public IndicatorSMA()
        {
            Initialize();
        }

        #endregion
    }
}