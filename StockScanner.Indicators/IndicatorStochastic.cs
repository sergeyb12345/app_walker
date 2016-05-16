using System.Collections.Generic;
using System.Linq;
using StockScanner.Indicators.Entities;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators
{
    public class IndicatorStochastic : IndicatorFormulaBase
    {
        public enum EnumChartLine
        {
            PercKLine = 0,
            PercDLine = 1
        }

        public enum EnumParamType
        {
            Period,
            SmoothK
        }

        public sealed override Dictionary<string, double> IndicatorParams { get; protected set; }
        public sealed override Dictionary<int, string> IndicatorCharts { get; protected set; }


        private void Initialize()
        {
            IndicatorParams = new Dictionary<string, double>
            {
                {EnumParamType.Period.ToString(), 13},
                {EnumParamType.SmoothK.ToString(), 5}
            };

            IndicatorCharts = new Dictionary<int, string>
            {
                {(int) EnumChartLine.PercKLine, EnumChartLine.PercKLine.ToString()},
                {(int) EnumChartLine.PercDLine, EnumChartLine.PercDLine.ToString()}
            };
        }


        /// <summary>
        ///     Calculate Stochastic fast line: %K
        /// </summary>
        /// <param name="period"></param>
        /// <param name="smoothK"></param>
        /// <returns></returns>
        public List<ICalculated> Calculate(int period, int smoothK)
        {
            var fastLine = new List<ICalculated>();
            List<ICalculated> result = null;

            if (HistoricalData != null && HistoricalData.Count > period)
            {
                ICalculated previous = null;
                for (var i = period; i <= HistoricalData.Count; i++)
                {
                    var llow = HistoricalData.Skip(i - period).Take(period).Min(c => c.LowValue);
                    var hhigh = HistoricalData.Skip(i - period).Take(period).Max(c => c.HighValue);

                    var data = HistoricalData[i - 1];
                    var k = (data.CloseValue - llow)/(hhigh - llow + 0.000000001)*100;

                    fastLine.Add(new Calculated(data.QuoteId, period, data.Date, EnumChartLine.PercKLine.ToString(), k,
                        previous));
                    previous = fastLine[fastLine.Count - 1];
                }

                result =
                    new IndicatorSMA(fastLine, EnumChartLine.PercKLine.ToString(), EnumChartLine.PercDLine.ToString())
                        .Calculate(smoothK);
            }

            return result;
        }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override List<ICalculated> Calculate()
        {
            var fparams = IndicatorParams;
            if (fparams != null
                && fparams.ContainsKey(EnumParamType.Period.ToString())
                && fparams.ContainsKey(EnumParamType.SmoothK.ToString()))
            {
                var period = (int) fparams[EnumParamType.Period.ToString()];
                var smoothK = (int) fparams[EnumParamType.SmoothK.ToString()];

                if (period > 0 && smoothK > 0)
                    return Calculate(period, smoothK);
            }

            return null;
        }

        #region Constructors

        public IndicatorStochastic(List<ICalculated> calcList)
            : base(calcList)
        {
            Initialize();
        }

        public IndicatorStochastic(List<IStockQuote> hisData)
            : base(hisData)
        {
            Initialize();
        }

        public IndicatorStochastic()
        {
            Initialize();
        }

        #endregion
    }
}