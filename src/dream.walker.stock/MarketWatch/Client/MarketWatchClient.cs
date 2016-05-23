using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using dream.walker.stock.Requests;

namespace dream.walker.stock.MarketWatch.Client
{
    //http://www.marketwatch.com/investing/Stock/AA?countrycode=US

        /// <summary>
        /// Intermidiate data for 3rd screen
        /// </summary>
    public class MarketWatchClient : IMarketStockClient
    {
        private readonly HttpClient _client;

        public MarketWatchClient(MarketWatchClientConfig config)
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

            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        #region BuildRequestMessage 

        private HttpRequestMessage BuildRequestMessage(GetStockHistoryRequest request)
        {
            var resourceUrl = "Market/ECProxy/ChartData";

            HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Post, resourceUrl);
            requestMessage.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            requestMessage.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue("en-GB"));

            string content = BuildMessageContent(request);
            requestMessage.Content = new StringContent(content, Encoding.UTF8, "application/x-www-form-urlencoded");

            return requestMessage;
        }

        private string BuildMessageContent(GetStockHistoryRequest request)
        {
            return $@"freq=1mi&time=1dy&Symbol=US%3A{request.Ticker.ToUpper()}&Width=325&XAxisUnit=&Flavor=&EntitlementToken=cecc4267a0194af89ca343805a3e57af";
        }

        #endregion

    }
}
