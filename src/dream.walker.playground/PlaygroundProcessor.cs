using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using dream.walker.playground.Models;
using dream.walker.reader.Models;

namespace dream.walker.playground
{
    public class PlaygroundProcessor
    {
        private readonly IndicatorProcessorFactory _indicatorProcessorFactory;
        public PlaygroundProcessor(IndicatorProcessorFactory indicatorProcessorFactory)
        {
            _indicatorProcessorFactory = indicatorProcessorFactory;
        }

        public ChartDataProcessor ChartData { get; set; }

        public void Initialize(CompanyHeader company, List<QuotesModel> historicalData, List<Indicator> indicators)
        {
            ChartData = new ChartDataProcessor(historicalData, indicators, company);
        }

        public void Reset(int bars, DateTime date)
        {
            ChartData.Initialize(bars, date);
        }

        private void CalculateIndicators()
        {
            foreach (var indicator in Indicators)
            {
                var calculator = _indicatorProcessorFactory.Create(indicator);
                if (calculator != null)
                {
                    IndicatorChartData indicatorData;

                    switch (indicator.Period)
                    {
                        case QuotePeriod.Daily:
                            var dresult = calculator.Calculate(indicator, ChartData.Daily.Company.Quotes).Take(ChartData.Bars).ToList();
                            indicatorData = new IndicatorChartData(indicator, dresult);

                            ChartData.Daily.Indicators.Add(indicatorData);
                            break;

                        case QuotePeriod.Weekly:
                            var wresult = calculator.Calculate(indicator, ChartData.Weekly.Company.Quotes);
                            indicatorData = new IndicatorChartData(indicator, wresult);

                            ChartData.Weekly.Indicators.Add(indicatorData);
                            break;
                    }
                }
            }
        }

        private void CalculateIndicators(QuotesModel quotes)
        {

        }


        public ChartDataProcessor Next()
        {
            //var lastDate = this.ChartData.Daily.Company.Quotes.First().Date;
            //if (HistoricalData.Any(q => q.Date > lastDate))
            //{
            //    var nextQuotes = HistoricalData.First(q => q.Date > lastDate);
            //    return ChartData.Next(nextQuotes);
            //}
            return null;
        }
    }
}