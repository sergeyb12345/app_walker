namespace dream.walker.stock.Yahoo.Client
{
    public class YahooFinanceClientConfig
    {
        public YahooFinanceClientConfig()
        {
            /*
            http://ichart.finance.yahoo.com/table.csv?d=6&e=1&f=2009&g=d&a=7&b=19&c=2004%20&ignore=.csv&s=AA
            */

            BaseUrl = "http://ichart.finance.yahoo.com/";
        }
        public string Proxy { get; set; }
        public string BaseUrl { get; set; }
    }
}