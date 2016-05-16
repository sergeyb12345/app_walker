using System.Collections.Generic;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainModel.Stock
{
    public interface IStockHistoricalData
    {
        int StockId { get; }
        EnumPeriodType PeriodType { get; }
        List<IStockQuote> Quotes { get; }


        void Register();
    }
}