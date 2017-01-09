using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using dream.walker.data.Extensions;
using dream.walker.data.Models;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartDataProcessor
    {

        private readonly List<QuotesModel> _historicalData;
        private readonly List<Indicator> _indicators;
        private readonly CompanyHeader _company;
        private readonly IndicatorProcessorFactory _indicatorProcessorFactory;

        public ChartDataProcessor(List<QuotesModel> historicalData, List<Indicator> indicators, CompanyHeader company, IndicatorProcessorFactory indicatorProcessorFactory)
        {
            _historicalData = historicalData;
            _indicators = indicators;
            _company = company;
            _indicatorProcessorFactory = indicatorProcessorFactory;
        }

        public ChartDataModel Initialize(int bars, DateTime date)
        {
            var weeklyQuotes = _historicalData.Where(q => q.Date <= date || date == DateTime.MinValue).ToList().ToWeeekly().TakeLast(bars);
            var dailyQuotes = _historicalData.Where(q => q.Date <= weeklyQuotes.First().Date).Take(bars).ToList();

            var dailyHist = new HistoricalQuotes(dailyQuotes);
            var weeklyHist = new HistoricalQuotes(weeklyQuotes);

            Daily = new ChartData
            {
                Company =
                {
                    Name = _company.FullName,
                    Quotes = dailyHist
                },

                Indicators = new IndicatorsChartData(_indicatorProcessorFactory)
                {
                    Quotes = dailyHist,
                    Indicators = _indicators.Where(i => i.Period == QuotePeriod.Daily).ToList()
                }
            };

            Weekly = new ChartData
            {
                Company =
                {
                    Name = _company.FullName,
                    Quotes = weeklyHist
                },

                Indicators = new IndicatorsChartData(_indicatorProcessorFactory)
                {
                    Quotes = weeklyHist,
                    Indicators = _indicators.Where(i => i.Period == QuotePeriod.Weekly).ToList()
                }
            };

            Daily.Indicators.ReCalculate();
            Weekly.Indicators.ReCalculate();

            return new ChartDataModel
            {
                Daily = Daily,
                Weekly = Weekly
            };
        }

        public ChartDataModel Next(int bars)
        {
            var nextQuotes = _historicalData.Where(q => q.Date > Daily.Company.Quotes.First().Date).Take(bars);
            foreach (var quotes in nextQuotes)
            {
                Daily.Company.Quotes.Next(quotes);
                Daily.Indicators.ReCalculate(Daily.Company.Quotes, Daily.Company.Quotes.Replace);

                Weekly.Company.Quotes.Next(quotes);
                Weekly.Indicators.ReCalculate(Weekly.Company.Quotes, Weekly.Company.Quotes.Replace);
            }
            return null;
        }

        public ChartDataModel Prev(int bars)
        {
            var nextQoutes = _historicalData.Where(q => q.Date < Daily.Company.Quotes.Last().Date).Take(bars);
            foreach (var qoute in nextQoutes)
            {
                Daily.Company.Quotes.Prev(qoute);
                Weekly.Company.Quotes.Prev(qoute);
            }
            return null;

        }

        private void CalculateIndicators()
        {
            foreach (var indicator in _indicators)
            {
                var calculator = _indicatorProcessorFactory.Create(indicator);
                if (calculator != null)
                {
                    IndicatorChartData indicatorData;

                    switch (indicator.Period)
                    {
                        case QuotePeriod.Daily:
                            var dresult = calculator.Calculate(indicator, Daily.Company.Quotes);
                            indicatorData = new IndicatorChartData(indicator, dresult);

                            Daily.Indicators.Add(indicatorData);
                            break;

                        case QuotePeriod.Weekly:
                            var wresult = calculator.Calculate(indicator, Weekly.Company.Quotes);
                            indicatorData = new IndicatorChartData(indicator, wresult);

                            Weekly.Indicators.Add(indicatorData);
                            break;
                    }
                }
            }
        }

        protected ChartData Weekly { get; set; }
        protected ChartData Daily { get; set; }

    }
}