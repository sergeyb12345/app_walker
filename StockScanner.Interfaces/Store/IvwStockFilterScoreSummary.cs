using System;

namespace StockScanner.Interfaces.Store
{
    public interface IvwStockFilterScoreSummary
    {
        int UniqueId { get; set; }

        int FilterId { get; set; }

        int StockId { get; set; }

        int SuccessRate { get; set; }

        string Ticker { get; set; }

        string CompanyName { get; set; }

        string FilterName { get; set; }

        DateTime DateTested { get; set; }
    }
}