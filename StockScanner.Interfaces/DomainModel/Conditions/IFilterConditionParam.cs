using System.Collections.Generic;
using StockScanner.Interfaces.DomainModel.Filters;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Interfaces.DomainModel.Conditions
{
    public interface IFilterConditionParam
    {
        IStockFilterIndicator Indicator { get; }
        IIndicatorFormula IndicatorFormula { get; }
        List<ICalculated> FormulaResult { get; }
        List<IStockQuote> StockQuotes { get; }
    }
}