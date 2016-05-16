using System.Collections.Generic;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Enumerators;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Interfaces.DomainModel.Filters
{
    public interface IStockFilterIndicator : IStockIndicator
    {
        int FilterId { get; }
        int Id { get; }

        EnumPeriodType Period { get; }
        new List<IStockIndicatorParamValue> GetParams();

        void ChangeName(string indicatorName);
        void RemoveFromFilter();
        void ChangePeriod(EnumPeriodType period);

        List<ICalculated> Calculate(List<IStockQuote> stockQuotes);
        IIndicatorFormula CreateFormula(List<IStockQuote> stockQuotes);

        void Register();
    }
}