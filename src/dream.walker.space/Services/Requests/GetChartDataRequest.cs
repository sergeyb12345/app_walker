using dream.walker.data.Enums;

namespace dream.walker.space.Services.Requests
{
    public class GetChartDataRequest
    {
        public string Ticker { get; set; }
        public QuotePeriod QuotePeriod { get; set; }
    }
}