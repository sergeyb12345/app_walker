using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.stock.Enums;
using dream.walker.stock.MarketWatch.Client;
using dream.walker.stock.Nasdaq.Client;
using dream.walker.stock.Requests;
using NUnit.Framework;

namespace dream.station.tests.Stock
{
    [TestFixture]
    public class MarketWatchTests
    {
        [Test]
        public void RequestData()
        {
            var client = new MarketWatchClient(new MarketWatchClientConfig());
            GetStockHistoryRequest request = new GetStockHistoryRequest()
            {
                Ticker = "A",
                TimeFrameValue = 5,
                TimeFrame = QuoteTimeFrame.Minute
            };
            var json = Task.Run(() => client.GetStockHistory(request)).Result;
            Assert.That(!string.IsNullOrWhiteSpace(json));
        }
    }
}
