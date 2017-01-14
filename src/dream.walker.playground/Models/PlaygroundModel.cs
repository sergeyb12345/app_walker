using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using dream.walker.data.Extensions;
using dream.walker.reader.Models;
using dream.walker.data.Models;

namespace dream.walker.playground.Models
{
    public class PlaygroundModel
    {
        private readonly List<QuotesModel> _quotes;
        private readonly Company _company;
        private readonly IndicatorProcessorFactory _indicatorProcessor;
        private bool _initialized = false;

        private Dictionary<QuotePeriod, ChartModel> Charts { get; set; }



        public PlaygroundModel(Company company, IndicatorProcessorFactory indicatorProcessor)
        {
            _quotes = company.HistoryQuotes;
            _company = company;
            _indicatorProcessor = indicatorProcessor;

            Charts = new Dictionary<QuotePeriod, ChartModel>();
        }


        public void Initialize(int bars, DateTime date, List<Indicator> indicators)
        {
            var weeklyQuotes = _quotes.Where(q => q.Date <= date || date == DateTime.MinValue).ToList().ToWeeekly().TakeLast(bars);
            var dailyQuotes = _quotes.Where(q => q.Date <= weeklyQuotes.First().Date).Take(bars).ToList();

            if (Charts.ContainsKey(QuotePeriod.Daily))
            {
                Charts.Remove(QuotePeriod.Daily);
            }
            if (Charts.ContainsKey(QuotePeriod.Weekly))
            {
                Charts.Remove(QuotePeriod.Weekly);
            }
            Charts.Add(QuotePeriod.Daily, new ChartModel(dailyQuotes));
            Charts.Add(QuotePeriod.Weekly, new ChartModel(weeklyQuotes));

            CalculateIndicators(indicators);

            _initialized = true;
        }

        private void CalculateIndicators(List<Indicator> indicators)
        {
            Validate(indicators);

            foreach (var indicator in indicators)
            {
                var calculator = _indicatorProcessor.Create(indicator);
                if (calculator != null)
                {
                    Charts[indicator.Period].CalculateIndicator(calculator, indicator);
                }
            }
        }



        private void Validate(List<Indicator> indicators)
        {
            if (indicators == null || indicators.Count == 0)
            {
                throw new ArgumentException("Indicators are not set");
            }
        }


        public bool Initialized()
        {
            return _initialized;
        }

        public List<QuotesModel> MoveNext(int bars)
        {
            Validate(bars);

            var first = Charts[QuotePeriod.Daily].Quotes.First();

            var quotes = _quotes.Where(q => q.Date > first.Date).OrderBy(q => q.Date).Take(bars).ToList();

            foreach (QuotePeriod period in Enum.GetValues(typeof(QuotePeriod)))
            {
                Charts[period].MoveNext(quotes);
            }

            return quotes;
        }

        public List<QuotesModel> MovePrev(int bars)
        {
            Validate(bars);

            var last = Charts[QuotePeriod.Daily].Quotes.Last();

            var quotes = _quotes.Where(q => q.Date < last.Date).Take(bars).ToList();

            foreach (QuotePeriod period in Enum.GetValues(typeof(QuotePeriod)))
            {
                Charts[period].MovePrev(quotes);
            }

            return quotes;
        }

        private void Validate(int bars)
        {
            Validate();
        }

        private void Validate()
        {
            if (!Initialized())
            {
                throw new Exception("PlaygroundModel is not Initialized");
            }
        }


        public PlaygroundChartModel Build(ChartUpdateMode mode = null)
        {
            var charts = new List<PlaygroundChartModel.ChartInfo>();
            foreach (QuotePeriod period in Enum.GetValues(typeof(QuotePeriod)))
            {
                var chart = new PlaygroundChartModel.ChartInfo(period, Charts[period], mode);
                charts.Add(chart);
            }

            return new PlaygroundChartModel
            {
                Company = new PlaygroundChartModel.CompanyInfo()
                {
                    Name = $"{_company.Ticker} - {_company.Name}"
                },
                Periods = charts
            };
        }
    }

}