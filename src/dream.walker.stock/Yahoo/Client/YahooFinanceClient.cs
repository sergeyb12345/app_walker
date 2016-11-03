using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using dream.walker.stock.Requests;

namespace dream.walker.stock.Yahoo.Client
{
    /*
    Using Yahoo's CSV approach above you can also get historical data! You can reverse engineer the following example:

    http://ichart.finance.yahoo.com/table.csv?s=YHOO&d=0&e=28&f=2010&g=d&a=3&b=12&c=1996&ignore=.csv

    Essentially:

    s = TICKER
    a = fromMonth-1
    b = fromDay (two digits)
    c = fromYear
    d = toMonth-1
    e = toDay (two digits)
    f = toYear
    g = d for day, m for month, y for yearly
    The complete list of parameters:

    a   Ask
    a2  Average Daily Volume
    a5  Ask Size
    b   Bid
    b2  Ask (Real-time)
    b3  Bid (Real-time)
    b4  Book Value
    b6  Bid Size
    c   Change & Percent Change
    c1  Change
    c3  Commission
    c6  Change (Real-time)
    c8  After Hours Change (Real-time)
    d   Dividend/Share
    d1  Last Trade Date
    d2  Trade Date
    e   Earnings/Share
    e1  Error Indication (returned for symbol changed / invalid)
    e7  EPS Estimate Current Year
    e8  EPS Estimate Next Year
    e9  EPS Estimate Next Quarter
    f6  Float Shares
    g   Day's Low
    h   Day's High
    j   52-week Low
    k   52-week High
    g1  Holdings Gain Percent
    g3  Annualized Gain
    g4  Holdings Gain
    g5  Holdings Gain Percent (Real-time)
    g6  Holdings Gain (Real-time)
    i   More Info
    i5  Order Book (Real-time)
    j1  Market Capitalization
    j3  Market Cap (Real-time)
    j4  EBITDA
    j5  Change From 52-week Low
    j6  Percent Change From 52-week Low     

     */
        /// <summary>
    /// Intermidiate data for 3rd screen
    /// </summary>
    public class YahooFinanceClient : IMarketStockClient
    {
        private readonly HttpClient _client;

        public YahooFinanceClient(YahooFinanceClientConfig config)
        {
            if (!string.IsNullOrWhiteSpace(config.Proxy))
            {
                var handler = new HttpClientHandler
                {
                    Proxy = new WebProxy(config.Proxy, false, new string[] {}),
                    UseProxy = !string.IsNullOrWhiteSpace(config.Proxy)
                };

                _client = new HttpClient(handler);
            }
            else
            {
                _client = new HttpClient();
            }
            _client.BaseAddress = new Uri(config.BaseUrl);
        }


        public async Task<string> GetStockHistory(GetStockHistoryRequest request)
        {
            var message = BuildRequestMessage(request);
            var response = await _client.SendAsync(message);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        #region BuildRequestMessage 

        private HttpRequestMessage BuildRequestMessage(GetStockHistoryRequest request)
        {
            string resourceUrl = BuildResourseUrl(request);

            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, resourceUrl);
            requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("text/csv"));


            return requestMessage;
        }

        private string BuildResourseUrl(GetStockHistoryRequest request)
        {
            return $"table.csv?s={request.Ticker.ToUpper()}&d={DateTime.Today.Month-1}&e={DateTime.Today.Day.ToString("00")}&f={DateTime.Today.Year}&g=d&a={request.FromDate.Month-1}&b={request.FromDate.Day.ToString("00")}&c={request.FromDate.Year}&ignore=.csv";
        }

        #endregion

    }
}
