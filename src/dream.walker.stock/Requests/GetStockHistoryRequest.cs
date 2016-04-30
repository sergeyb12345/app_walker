using dream.walker.stock.Enums;
using dream.walker.stock.Nasdaq.Client;

namespace dream.walker.stock.Requests
{
    public class GetStockHistoryRequest
    {
        public QuoteTimeFrame TimeFrame { get; set; }
        public int TimeFrameValue { get; set; }
        public string Symbol { get; set; }
    }
}