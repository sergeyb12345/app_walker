using System.Collections.Generic;
using StockScanner.Indicators.Entities;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators
{
    public class IndicatorMACDHistogram : IndicatorFormulaBase
    {
        /// <summary>
        ///     Formula Output results
        /// </summary>
        public enum EnumChartLine
        {
            MacdFast = 0,
            MacdSignal = 1,
            MacdHistogram = 2
        }

        /// <summary>
        ///     Formula Input Parameters
        /// </summary>
        public enum EnumParamType
        {
            MacdFastPeriod,
            MacdSlowPeriod,
            MacdSignalPeriod
        }

        private readonly bool _smaSignalLine = true;

        public sealed override Dictionary<string, double> IndicatorParams { get; protected set; }
        public sealed override Dictionary<int, string> IndicatorCharts { get; protected set; }

        /// <summary>
        ///     Initializes IndicatorParams & IndicatorCharts
        /// </summary>
        private void Initialize()
        {
            IndicatorParams = new Dictionary<string, double>
            {
                {EnumParamType.MacdFastPeriod.ToString(), 12},
                {EnumParamType.MacdSlowPeriod.ToString(), 26},
                {EnumParamType.MacdSignalPeriod.ToString(), 9}
            };

            IndicatorCharts = new Dictionary<int, string>
            {
                {(int) EnumChartLine.MacdFast, EnumChartLine.MacdFast.ToString()},
                {(int) EnumChartLine.MacdSignal, EnumChartLine.MacdSignal.ToString()},
                {(int) EnumChartLine.MacdHistogram, EnumChartLine.MacdHistogram.ToString()}
            };
        }

        /// <summary>
        ///     Calculates the MACD Histogram
        /// </summary>
        /// <param name="fastPeriod">The fast period.</param>
        /// <param name="slowPeriod">The slow period.</param>
        /// <param name="signalPeriod">The signal period.</param>
        /// <returns></returns>
        public List<ICalculated> Calculate(int fastPeriod, int slowPeriod, int signalPeriod)
        {
            List<ICalculated> result = null;
            if (HistoricalData != null)
            {
                result = Calculate(fastPeriod, slowPeriod, signalPeriod, HistoricalData);
            }

            return result;
        }

        /// <summary>
        ///     Calculates the MACD Histogram
        /// </summary>
        /// <param name="fastPeriod">The fast period.</param>
        /// <param name="slowPeriod">The slow period.</param>
        /// <param name="signalPeriod">The signal period.</param>
        /// <param name="historicalData">The historical data.</param>
        /// <returns></returns>
        private List<ICalculated> Calculate(int fastPeriod, int slowPeriod, int signalPeriod,
            List<IStockQuote> historicalData)
        {
            var result = new List<ICalculated>();
            var emaFast = new IndicatorEMA(historicalData).Calculate(fastPeriod);
            var emaSlow = new IndicatorEMA(historicalData).Calculate(slowPeriod);
            var macdLine = emaFast.Substract(emaSlow, IndicatorEMA.EnumChartLine.Ema.ToString(),
                IndicatorEMA.EnumChartLine.Ema.ToString(), EnumChartLine.MacdFast.ToString());

            List<ICalculated> signalLine;

            if (_smaSignalLine)
                signalLine =
                    new IndicatorSMA(macdLine, EnumChartLine.MacdFast.ToString(), EnumChartLine.MacdSignal.ToString())
                        .Calculate(signalPeriod);
            else
                signalLine =
                    new IndicatorEMA(macdLine, EnumChartLine.MacdFast.ToString(), EnumChartLine.MacdSignal.ToString())
                        .Calculate(signalPeriod);

            //return signalLine;
            var macdhist = macdLine.Substract(signalLine, EnumChartLine.MacdFast.ToString(),
                EnumChartLine.MacdSignal.ToString(), EnumChartLine.MacdHistogram.ToString());

            result = result.Attach(macdLine, EnumChartLine.MacdFast.ToString(), EnumChartLine.MacdFast.ToString());
            result = result.Attach(signalLine, EnumChartLine.MacdSignal.ToString(), EnumChartLine.MacdSignal.ToString());
            result = result.Attach(macdhist, EnumChartLine.MacdHistogram.ToString(),
                EnumChartLine.MacdHistogram.ToString());

            return result;
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override List<ICalculated> Calculate()
        {
            var fparams = IndicatorParams;
            if (fparams != null
                && fparams.ContainsKey(EnumParamType.MacdFastPeriod.ToString())
                && fparams.ContainsKey(EnumParamType.MacdSlowPeriod.ToString())
                && fparams.ContainsKey(EnumParamType.MacdSignalPeriod.ToString()))
            {
                var macdFastPeriod = (int) fparams[EnumParamType.MacdFastPeriod.ToString()];
                var macdSlowPeriod = (int) fparams[EnumParamType.MacdSlowPeriod.ToString()];
                var macdSignalPeriod = (int) fparams[EnumParamType.MacdSignalPeriod.ToString()];

                if (macdFastPeriod > 0 && macdSlowPeriod > 0 && macdSignalPeriod > 0)
                    return Calculate(macdFastPeriod, macdSlowPeriod, macdSignalPeriod);
            }

            return null;
        }

        #region Constructors

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorMACDHistogram" /> class.
        /// </summary>
        /// <param name="calculatedData">The calculated data.</param>
        public IndicatorMACDHistogram(List<ICalculated> calculatedData)
            : base(calculatedData)
        {
            Initialize();
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorMACDHistogram" /> class.
        /// </summary>
        /// <param name="historicalData">The historical data.</param>
        public IndicatorMACDHistogram(List<IStockQuote> historicalData)
            : base(historicalData)
        {
            Initialize();
        }

        public IndicatorMACDHistogram()
        {
            Initialize();
        }

        #endregion
    }
}