using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class CommpanyChartData
    {
        public CommpanyChartData(List<QuotesModel> quotes)
        {
            Quotes = new HistoricalQuotes(quotes);

        }
        public CommpanyChartData()
        {
            Quotes = new HistoricalQuotes();
        }

        public string Name { get; set; }
        public HistoricalQuotes Quotes { get; set; }

        public CommpanyChartData Get(DateTime date)
        {
            return new CommpanyChartData
            {
                Name = Name,
                Quotes = Quotes.Get(date)
            };
        }
    }
}