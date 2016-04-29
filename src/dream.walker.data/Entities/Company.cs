using System;

namespace dream.walker.data.Entities
{
    public class Company
    {
        public Company()
        {
            LastUpdated = DateTime.Today.AddMonths(-1);
            LastCalculated = DateTime.Today.AddMonths(-1);
            NextReportDate = DateTime.Today.AddMonths(-1);
        }

        public string Ticker { get; set; }
        public string Name { get; set; }
        public decimal MarketCap { get; set; }
        public string Sector { get; set; }
        public string Industry { get; set; }
        public string SummaryUrl { get; set; }
        public DateTime LastUpdated { get; set; }
        public DateTime LastCalculated { get; set; }
        public decimal Volume { get; set; }
        public decimal Price { get; set; }
        public decimal HighestPrice52 { get; set; }
        public decimal LowestPrice52 { get; set; }
        public int ChaosPercentage { get; set; }
        public string LiveQuoteJson { get; set; }
        public string HistoryQuotesJson { get; set; }
        public DateTime NextReportDate { get; set; }

    }
}
