using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.reader.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Services
{
    public class UpdateQuotesRequest
    {
        public UpdateQuotesRequest(string ticker, List<QuotesModel> quotes)
        {
            Initialize(ticker, quotes);
        }

        private void Initialize(string ticker, List<QuotesModel> quotes)
        {
            Ticker = ticker;
            Volume = quotes.Take(10).Average(q => q.Volume);
            Price = quotes.First().Close;
            HighestHigh52 = quotes.Where(q => q.Date > DateTime.Today.AddYears(-1)).Max(p => p.High);
            LowestLow52 = quotes.Where(q => q.Date > DateTime.Today.AddYears(-1)).Min(p => p.Low);
            ChaosPercentage = CalculateChaos(quotes);
            CalculatedTime = DateTime.Now;
            JsonQuotes = JsonConvert.SerializeObject(quotes);
        }

        public DateTime CalculatedTime { get; set; }

        public int ChaosPercentage { get;private set; }

        public decimal LowestLow52 { get; private set; }

        public decimal HighestHigh52 { get; private set; }

        public decimal Price { get; private set; }

        public decimal Volume { get; private set; }

        public string Ticker { get; private set; }
        public string JsonQuotes { get; private set; }
        public string ErrorMessage { get; set; }


        private int CalculateChaos(List<QuotesModel> quotes)
        {
            var avgRange = quotes.Take(20).Average(q => q.High - q.Low);
            var maxRange = quotes.Take(20).Max(q => q.High - q.Low);

            var priceRange = new List<decimal>();

            for (int i = 1; i <= 20; i++)
            {
                var p1 = quotes[i - 1].Close;
                var p2 = quotes[i].Close;

                priceRange.Add(Math.Abs(p1 - p2));
            }

            var avgPriceChange = priceRange.Average(p => p);
            var maxPriceChange = priceRange.Max(p => p);

            if (avgRange > 0 && maxRange > 0)
            {
                var avgChaos = 100 - (avgPriceChange / avgRange) * 100;
                var maxChaos = 100 - (maxPriceChange / maxRange) * 100;

                return (int)(avgChaos + maxChaos) / 2;
            }

            return 0;
        }
    }
}