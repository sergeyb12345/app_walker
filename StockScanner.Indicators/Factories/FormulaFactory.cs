using System;
using System.Collections.Generic;
using System.Linq;
using StockScanner.Interfaces.DomainModel.Filters;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Enumerators;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators.Factories
{
    public class FormulaFactory
    {
        /// <summary>
        /// </summary>
        /// <param name="inf"></param>
        /// <param name="hd"></param>
        /// <returns></returns>
        public static IIndicatorFormula Create(IStockFilterIndicator inf, List<IStockQuote> hd)
        {
            IIndicatorFormula indicatorFormula = null;
            Dictionary<string, double> fparams = null;
            var ftype = (EnumFormulaType) Enum.Parse(typeof (EnumFormulaType), inf.IndicatorName);

            switch (ftype)
            {
                case EnumFormulaType.EMA:
                    indicatorFormula = new IndicatorEMA(hd);
                    break;

                case EnumFormulaType.SMA:
                    indicatorFormula = new IndicatorSMA(hd);
                    break;

                case EnumFormulaType.ForceIndex:
                    indicatorFormula = new IndicatorForceIndex(hd);
                    break;

                case EnumFormulaType.ImpulseSystem:
                    indicatorFormula = new IndicatorImpulseSystem(hd);
                    break;

                case EnumFormulaType.MACDHistogram:
                    indicatorFormula = new IndicatorMACDHistogram(hd);
                    break;
                case EnumFormulaType.Stochastic:
                    indicatorFormula = new IndicatorStochastic(hd);
                    break;
            }

            if (indicatorFormula != null)
            {
                fparams = indicatorFormula.IndicatorParams;
                var ps = (from ip in inf.GetParams()
                    join fp in inf.GetParams() on ip.ParamId equals fp.ParamId
                    select new {Key = ip.ParamName, Value = fp.ParamValue}).ToList();

                foreach (var p in ps)
                {
                    if (fparams.ContainsKey(p.Key))
                        fparams[p.Key] = p.Value;
                }

                return indicatorFormula;
            }

            return null;
        }
    }
}