using System.Collections.Generic;
using System.Linq;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators.Entities
{
    public abstract class IndicatorFormulaBase : IIndicatorFormula
    {
        protected List<ICalculated> CalculatedData { get; private set; }
        protected List<IStockQuote> HistoricalData { get; private set; }


        public virtual string Name
        {
            get { return GetType().Name; }
        }

        public virtual string ToString(Dictionary<string, double> fparams)
        {
            if (fparams != null && fparams.Count > 0)
            {
                return string.Format("{0}({1})", Name, string.Join(",", from p in fparams select p.Value));
            }
            return Name;
        }

        #region Abstract Members

        public abstract Dictionary<string, double> IndicatorParams { get; protected set; }
        public abstract Dictionary<int, string> IndicatorCharts { get; protected set; }

        public abstract List<ICalculated> Calculate();

        #endregion

        #region Constructors

        protected IndicatorFormulaBase()
        {
        }

        protected IndicatorFormulaBase(List<ICalculated> calculatedData)
        {
            CalculatedData = calculatedData;
        }

        protected IndicatorFormulaBase(List<IStockQuote> histData)
        {
            HistoricalData = histData;
        }

        #endregion
    }
}