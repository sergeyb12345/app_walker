using System;

namespace dream.walker.data.Requests
{
    public class UpdateMetricsRequest
    {
        public decimal Volume { get; set; }
        public decimal Price { get; set; }
        public decimal High52 { get; set; }
        public decimal Low52 { get; set; }
        public int ChaosPercentage { get; set; }
        public string Ticker { get; set; }
        public DateTime CalculatedTime { get; set; }
    }
}