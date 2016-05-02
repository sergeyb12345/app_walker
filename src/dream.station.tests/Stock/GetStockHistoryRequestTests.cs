using System;
using dream.walker.data.Models;
using dream.walker.stock.Enums;
using dream.walker.stock.Requests;
using FluentAssertions;
using NUnit.Framework;

namespace dream.station.tests.Stock
{
    [TestFixture]
    public class GetStockHistoryRequestTests
    {
        [Test]
        public void InitFromCtor_When_365daysAgo()
        {
            var company = new CompanyTradingData
            {
                Ticker = "AAA",
                LastUpdated = DateTime.Today.AddDays(-34)
            };

            var request = new GetStockHistoryRequest(company);

            request.TimeFrame.Should().Be(QuoteTimeFrame.Month);
            request.TimeFrameValue.Should().Be(2);
            
        }
    }
}
