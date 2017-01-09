using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using dream.walker.data.Extensions;
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

            HistoricalData = new List<QuotesModel>();
            Indicators = new List<Indicator>();
            Company = new CompanyHeader();
        }

        public List<QuotesModel> HistoricalData { get; set; }
        public List<Indicator> Indicators { get; set; }
        public CompanyHeader Company { get; set; }
        public ChartDataModel ChartData { get; set; }

        public void Initialize(CompanyHeader company, List<QuotesModel> historicalData, List<Indicator> indicators)
        {
            Company = company;
            HistoricalData = historicalData;
            Indicators = indicators;
            ChartData = new ChartDataModel();
            ChartData.Daily.Company.Name = Company.FullName;
            ChartData.Weekly.Company.Name = Company.FullName;
        }

        public ChartDataModel Reset(int bars, DateTime date)
        {
            var weeklyQuotes = HistoricalData.Where(q => q.Date <= date || date == DateTime.MinValue).ToList().ToWeeekly().TakeLast(bars);
            var dailyQuotes = HistoricalData.Where(q => q.Date <= weeklyQuotes.First().Date).Take(bars).ToList();

            ChartData.Daily.Company.Quotes = new HistoricalQuotes(dailyQuotes);
            ChartData.Weekly.Company.Quotes = new HistoricalQuotes(weeklyQuotes);
            ChartData.Bars = bars;

            CalculateIndicators();

            return ChartData;
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

        public void Next()
        {
            var lastDate = ChartData.Daily.Company.Quotes.First().Date;
            if (HistoricalData.Any(q => q.Date > lastDate))
            {
                var nextQuotes = HistoricalData.First(q => q.Date > lastDate);

                ChartData.Weekly.Company.Quotes.Add(nextQuotes);
                ChartData.Daily.Company.Quotes.Add(nextQuotes);

                CalculateIndicators(nextQuotes);
            }
        }
    }
}