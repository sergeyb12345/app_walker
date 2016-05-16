using System;

namespace StockScanner.Interfaces.Store
{
    public interface IvwStockQuote
    {
        int CompanyId { get; set; }

        int QuoteId { get; set; }

        DateTime QuoteDate { get; set; }

        double OpenValue { get; set; }

        double HighValue { get; set; }

        double LowValue { get; set; }

        double CloseValue { get; set; }

        int Volume { get; set; }

        int PeriodId { get; set; }
    }
}