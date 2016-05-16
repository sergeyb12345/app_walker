using System;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainModel.Stock
{
    public interface IStockQuote : IDomainModel
    {
        int QuoteId { get; }

        int CompanyId { get; }

        DateTime Date { get; }

        double OpenValue { get; }

        double HighValue { get; }

        double LowValue { get; }

        double CloseValue { get; }

        int Volume { get; }

        EnumPeriodType PerionId { get; }

        void Register();
    }
}