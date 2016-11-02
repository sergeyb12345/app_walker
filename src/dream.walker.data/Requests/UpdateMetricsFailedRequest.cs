using System;

namespace dream.walker.data.Requests
{
    public class UpdateMetricsFailedRequest
    {
        public string Ticker { get; set; }
        public DateTime CalculatedTime { get; set; }
        public string ErrorMessage { get; set; }
    }
}