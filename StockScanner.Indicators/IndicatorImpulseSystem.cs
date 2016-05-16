using System.Collections.Generic;
using System.Linq;
using StockScanner.Indicators.Entities;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators
{
    /// <summary>
    /// </summary>
    public class IndicatorImpulseSystem : IndicatorFormulaBase
    {
        /// <summary>
        ///     Formula output result
        /// </summary>
        public enum EnumChartLine
        {
            ImpulseSystem = 0
        }

        /// <summary>
        ///     Formula Input parameters
        /// </summary>
        public enum EnumParamType
        {
            EmaPeriod,
            MacdFastPeriod,
            MacdSlowPeriod,
            MacdSignalPeriod
        }

        public sealed override Dictionary<string, double> IndicatorParams { get; protected set; }
        public sealed override Dictionary<int, string> IndicatorCharts { get; protected set; }


        /// <summary>
        ///     Initializes IndicatorParams &  IndicatorCharts
        /// </summary>
        private void Initialize()
        {
            IndicatorParams = new Dictionary<string, double>
            {
                {EnumParamType.EmaPeriod.ToString(), 26},
                {EnumParamType.MacdFastPeriod.ToString(), 12},
                {EnumParamType.MacdSlowPeriod.ToString(), 26},
                {EnumParamType.MacdSignalPeriod.ToString(), 9}
            };
            IndicatorCharts = new Dictionary<int, string>
            {
                {(int) EnumChartLine.ImpulseSystem, EnumChartLine.ImpulseSystem.ToString()}
            };
        }


        /// <summary>
        ///     Calculates ImpulseSystem
        /// </summary>
        /// <param name="emaPeriod">The ema period.</param>
        /// <param name="macdFastPeriod">The macd fast period.</param>
        /// <param name="macdSlowPeriod">The macd slow period.</param>
        /// <param name="macdSignalPeriod">The macd signal period.</param>
        /// <returns></returns>
        public List<ICalculated> Calculate(int emaPeriod, int macdFastPeriod, int macdSlowPeriod, int macdSignalPeriod)
        {
            List<ICalculated> result = null;
            if (HistoricalData != null)
                result = Calculate(emaPeriod, macdFastPeriod, macdSlowPeriod, macdSignalPeriod, HistoricalData);

            return result;
        }


        /// <summary>
        ///     Calculates the Impulse System
        /// </summary>
        /// <param name="emaPeriod">The ema period.</param>
        /// <param name="macdFastPeriod">The macd fast period.</param>
        /// <param name="macdSlowPeriod">The macd slow period.</param>
        /// <param name="macdSignalPeriod">The macd signal period.</param>
        /// <param name="historicalData">The historical data.</param>
        /// <returns></returns>
        private static List<ICalculated> Calculate(int emaPeriod, int macdFastPeriod, int macdSlowPeriod,
            int macdSignalPeriod, List<IStockQuote> historicalData)
        {
            var result = new List<ICalculated>();
            var ema = new IndicatorEMA(historicalData).Calculate(emaPeriod);
            var macdh = new IndicatorMACDHistogram(historicalData).Calculate(macdFastPeriod, macdSlowPeriod,
                macdSignalPeriod);

            if (ema != null && ema.Count > 0 && macdh != null && macdh.Count > 0)
            {
                var calcData = (from ma in ema
                    join h in macdh on ma.CalculatedItemId equals h.CalculatedItemId
                    select
                        new Calculated(ma.CalculatedItemId, ma.TimePeriod, ma.Date,
                            EnumChartLine.ImpulseSystem.ToString(), Calculate(ma, h), null))
                    .OrderBy(c => c.Date)
                    .Cast<ICalculated>()
                    .ToList();

                ICalculated prev = null;
                foreach (var calculated in calcData)
                {
                    calculated.Previous = prev;
                    prev = calculated;
                }
                return calcData;
            }

            return null;
        }

        /// <summary>
        ///     Calculates tmpulse System
        /// </summary>
        /// <param name="ma">The ma.</param>
        /// <param name="h">The h.</param>
        /// <returns></returns>
        private static double Calculate(ICalculated ma, ICalculated h)
        {
            var result =
                (ma.GetValue(IndicatorEMA.EnumChartLine.Ema.ToString()) >
                 ma.GetValue(IndicatorEMA.EnumChartLine.Ema.ToString(), 1)
                    ? 1
                    : -1) +
                (h.GetValue(IndicatorMACDHistogram.EnumChartLine.MacdHistogram.ToString()) >
                 h.GetValue(IndicatorMACDHistogram.EnumChartLine.MacdHistogram.ToString(), 1)
                    ? 1
                    : -1);

            if (result > 1) result = 1;
            if (result < -1) result = -1;

            return result;
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override List<ICalculated> Calculate()
        {
            var fparams = IndicatorParams;

            if (fparams != null && fparams.ContainsKey(EnumParamType.EmaPeriod.ToString())
                && fparams.ContainsKey(EnumParamType.MacdFastPeriod.ToString())
                && fparams.ContainsKey(EnumParamType.MacdSlowPeriod.ToString())
                && fparams.ContainsKey(EnumParamType.MacdSignalPeriod.ToString()))
            {
                var emaPeriod = (int) fparams[EnumParamType.EmaPeriod.ToString()];
                var macdFastPeriod = (int) fparams[EnumParamType.MacdFastPeriod.ToString()];
                var macdSlowPeriod = (int) fparams[EnumParamType.MacdSlowPeriod.ToString()];
                var macdSignalPeriod = (int) fparams[EnumParamType.MacdSignalPeriod.ToString()];

                if (emaPeriod > 0 && macdFastPeriod > 0 && macdSlowPeriod > 0 && macdSignalPeriod > 0)
                    return Calculate(emaPeriod, macdFastPeriod, macdSlowPeriod, macdSignalPeriod);
            }

            return null;
        }

        #region Constructors

        public IndicatorImpulseSystem(List<ICalculated> calcList)
            : base(calcList)
        {
            Initialize();
        }

        public IndicatorImpulseSystem(List<IStockQuote> hisData)
            : base(hisData)
        {
            Initialize();
        }

        public IndicatorImpulseSystem()
        {
            Initialize();
        }

        #endregion
    }
}