using System;

namespace StockScanner.Interfaces.Store
{
    public interface IHistoricalData : IStoreEntity
    {
        int StockId { get; set; }

        DateTime Date { get; set; }

        double OpenValue { get; set; }

        double HighValue { get; set; }

        double LowValue { get; set; }

        double CloseValue { get; set; }

        int Volume { get; set; }

        int PerionId { get; set; }
    }
}