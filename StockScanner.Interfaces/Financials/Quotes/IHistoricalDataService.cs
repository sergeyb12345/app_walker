using System;
using System.Collections.Generic;
using StockScanner.Interfaces.Enumerators;
using StockScanner.Interfaces.Store;

namespace StockScanner.Interfaces.Financials.Quotes
{
    public interface IHistoricalDataService
    {
        List<IHistoricalData> DownloadHistoricalData(string ticker, EnumPeriodType period, DateTime startDate);
        IHistoricalData GetLiveQuotes(string ticker);
    }
}