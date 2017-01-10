using System.Collections.Generic;
using System.Linq;
using dream.walker.calculators;
using dream.walker.data.Entities.Indicators;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartModel
    {
        private readonly HistoricalQuotes _quotes;

        public ChartModel(List<QuotesModel> quotes)
        {
            _quotes = new HistoricalQuotes(quotes);

            Company = new CommpanyChartData();
            Indicators = new IndicatorsChartData();
        }


        public CommpanyChartData Company { get; set; }
        public IndicatorsChartData Indicators { get; set; }


        public void CalculateIndicator(IIndicatorCalculator calculator, Indicator indicator)
        {

            if(!Indicators.ContainsKey(indicator.IndicatorId)) 
            {
                Indicators.Add(indicator.IndicatorId, new IndicatorChartData(calculator, indicator));
            }

            Indicators[indicator.IndicatorId].Calculate(_quotes);
        }

        private void MoveNext(QuotesModel quotes)
        {
            _quotes.Next(quotes);

            foreach (var indicator in Indicators)
            {
                indicator.Value.Calculate(_quotes);
            }
        }

        private void MovePrev(QuotesModel quotes)
        {
            _quotes.Prev(quotes);

            foreach (var indicator in Indicators)
            {
                indicator.Value.Calculate(_quotes);
            }
        }


        public void MoveNext(int bars)
        {
            var first = _quotes.First();
            var quotes = _quotes.Where(q => q.Date > first.Date).Take(bars);

            foreach (var quote in quotes)
            {
                MoveNext(quote);
            }
        }

        public void MovePrev(int bars)
        {
            var last = _quotes.Last();
            var quotes = _quotes.Where(q => q.Date < last.Date).Take(bars);

            foreach (var quote in quotes)
            {
                MovePrev(quote);
            }
        }
    }


}