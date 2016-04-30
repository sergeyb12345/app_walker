namespace dream.walker.stock.Nasdaq.Client
{
    public class NasdaqStockClientConfig
    {
        public NasdaqStockClientConfig()
        {
            BaseUrl = "http://www.nasdaq.com/";
        }
        public string Proxy { get; set; }
        public string BaseUrl { get; set; }
    }
}