using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartData
    {
        public ChartData()
        {
            Company = new CommpanyChartData();
            Indicators = new List<IndicatorChartData>();
            Replace = false;
        }

        public CommpanyChartData Company { get; set; }
        public List<IndicatorChartData> Indicators { get; set; }


        public bool Replace { get; private set; }

        public ChartData Next(QuotesModel nextQuotes)
        {
            Company.Quotes.Add(nextQuotes);

            return this;
        }
    }
}