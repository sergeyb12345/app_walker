using System.Collections.Generic;
using System.Linq;
using dream.walker.calculators;
using dream.walker.data.Entities.Indicators;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartModel
    {
        public HistoricalQuotes Quotes { get; private set; }

        public ChartModel(List<QuotesModel> quotes)
        {
            Quotes = new HistoricalQuotes(quotes);
            Indicators = new IndicatorsChartData();
        }


        public IndicatorsChartData Indicators { get; set; }


        public void CalculateIndicator(IIndicatorCalculator calculator, Indicator indicator)
        {

            if(!Indicators.ContainsKey(indicator.IndicatorId)) 
            {
                Indicators.Add(indicator.IndicatorId, new IndicatorChartData(calculator, indicator));
            }

            Indicators[indicator.IndicatorId].Calculate(Quotes);
        }

        private void MoveNext(QuotesModel quotes)
        {
            Quotes.Next(quotes);

            foreach (var indicator in Indicators)
            {
                indicator.Value.Calculate(Quotes);
            }
        }

        private void MovePrev(QuotesModel quotes)
        {
            Quotes.Prev(quotes);

            foreach (var indicator in Indicators)
            {
                indicator.Value.Calculate(Quotes);
            }
        }


        public void MoveNext(IEnumerable<QuotesModel> quotes)
        {
            foreach (var quote in quotes)
            {
                MoveNext(quote);
            }
        }

        public void MovePrev(List<QuotesModel> quotes)
        {
            foreach (var quote in quotes)
            {
                MovePrev(quote);
            }
        }
    }


}