using System.Collections.Generic;
using StockScanner.Indicators.Entities;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators
{
    public class IndicatorForceIndex : IndicatorFormulaBase
    {
        /// <summary>
        ///     Formula output result
        /// </summary>
        public enum EnumChartLine
        {
            ForceIndex = 0
        }

        /// <summary>
        ///     Formula input parameters
        /// </summary>
        public enum EnumParamType
        {
            EmaPeriod
        }

        private readonly string _destKey;
        private readonly string _sourceKey;

        public sealed override Dictionary<string, double> IndicatorParams { get; protected set; }
        public sealed override Dictionary<int, string> IndicatorCharts { get; protected set; }


        private void Initialize()
        {
            IndicatorParams = new Dictionary<string, double> {{EnumParamType.EmaPeriod.ToString(), 2}};
            IndicatorCharts = new Dictionary<int, string>
            {
                {(int) EnumChartLine.ForceIndex, EnumChartLine.ForceIndex.ToString()}
            };
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

            return result;
        }

        /// <summary>
        ///     Calculates the specified period.
        /// </summary>
        /// <param name="period">The period.</param>
        /// <param name="histData">The hist data.</param>
        /// <returns></returns>
        private List<ICalculated> Calculate(int period, List<IStockQuote> histData)
        {
            var calcData = new List<ICalculated>();

            if (histData != null && histData.Count > period)
            {
                ICalculated previous = null;
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
            }

            return null;
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override List<ICalculated> Calculate()
        {
            var fparams = IndicatorParams;
            if (fparams != null && fparams.ContainsKey(EnumParamType.EmaPeriod.ToString()))
            {
                var period = fparams[EnumParamType.EmaPeriod.ToString()];
                if (period > 0)
                    return Calculate((int) period);
            }

            return null;
        }

        #region Constructors

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorForceIndex" /> class.
        /// </summary>
        /// <param name="calcList">The calc list.</param>
        /// <param name="sourceKey">The source key.</param>
        /// <param name="destKey">The dest key.</param>
        public IndicatorForceIndex(List<ICalculated> calcList, string sourceKey, string destKey)
            : base(calcList)
        {
            _sourceKey = sourceKey;
            _destKey = destKey;
            Initialize();
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="IndicatorForceIndex" /> class.
        /// </summary>
        /// <param name="historicalData"></param>
        public IndicatorForceIndex(List<IStockQuote> historicalData)
            : base(historicalData)
        {
            Initialize();
        }

        public IndicatorForceIndex()
        {
            Initialize();
        }

        #endregion
    }
}