namespace dream.walker.stock.MarketWatch.Client
{
    public class MarketWatchClientConfig
    {
        public MarketWatchClientConfig()
        {
            BaseUrl = "http://www.marketwatch.com/";
        }
        public string Proxy { get; set; }
        public string BaseUrl { get; set; }
    }
}