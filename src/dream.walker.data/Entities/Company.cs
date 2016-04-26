using System;

namespace dream.walker.data.Entities
{
    public class Company
    {
        public Company()
        {
            LastUpdated = DateTime.MinValue;
            LastCalculated = DateTime.MinValue;
            NextReportDate = DateTime.MinValue;
        }

        public string Ticker { get; set; }
        public string Name { get; set; }
        public double MarketCap { get; set; }
        public string Sector { get; set; }
        public string Industry { get; set; }
        public string SummaryUrl { get; set; }
        public DateTime LastUpdated { get; set; }
        public DateTime LastCalculated { get; set; }
        public double Volume { get; set; }
        public double Price { get; set; }
        public double HighestPrice52 { get; set; }
        public double LowestPrice52 { get; set; }
        public int ChaosPercentage { get; set; }
        public string LiveQuoteJson { get; set; }
        public string HistoryQuotesJson { get; set; }
        public DateTime NextReportDate { get; set; }

    }
}
