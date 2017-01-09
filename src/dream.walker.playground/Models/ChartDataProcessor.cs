using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Extensions;
using dream.walker.data.Models;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartDataProcessor
    {

        private readonly List<QuotesModel> _historicalData;
        private List<Indicator> _indicators;
        private readonly CompanyHeader _company;

        public ChartDataProcessor(List<QuotesModel> historicalData, List<Indicator> indicators, CompanyHeader company)
        {
            _historicalData = historicalData;
            _indicators = indicators;
            _company = company;
        }

        public void Initialize(int bars, DateTime date)
        {
            var weeklyQuotes = _historicalData.Where(q => q.Date <= date || date == DateTime.MinValue).ToList().ToWeeekly().TakeLast(bars);
            var dailyQuotes = _historicalData.Where(q => q.Date <= weeklyQuotes.First().Date).Take(bars).ToList();

            Daily = new ChartData
            {
                Company =
                {
                    Name = _company.FullName,
                    Quotes = new HistoricalQuotes(dailyQuotes)
                }
            };

            Weekly = new ChartData
            {
                Company =
                {
                    Name = _company.FullName,
                    Quotes = new HistoricalQuotes(weeklyQuotes)
                }
            };
        }


        public ChartData Weekly { get; set; }
        public ChartData Daily { get; set; }
        public int Bars { get; set; }


        public ChartDataProcessor Next(QuotesModel nextQuotes)
        {
            Weekly.Company.Quotes.Add(nextQuotes);
            Daily.Company.Quotes.Add(nextQuotes);

            return null;
            //return new ChartDataProcessor
            //{
            //    Weekly = Weekly.Next(nextQuotes),
            //    Daily = Daily.Next(nextQuotes)
            //};

        }
    }
}