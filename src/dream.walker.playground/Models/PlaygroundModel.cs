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
        private readonly IndicatorProcessorFactory _indicatorProcessor;
        private bool _initialized = false;

        private Dictionary<QuotePeriod, ChartModel> Charts { get; set; }



        public PlaygroundModel(Company company, IndicatorProcessorFactory indicatorProcessor)
        {
            _quotes = company.HistoryQuotes;
            _indicatorProcessor = indicatorProcessor;

            Charts = new Dictionary<QuotePeriod, ChartModel>();
        }


        public void Initialize(int bars, DateTime date, List<Indicator> indicators)
        {
            var weeklyQuotes = _quotes.Where(q => q.Date <= date || date == DateTime.MinValue).ToList().ToWeeekly().TakeLast(bars);
            var dailyQuotes = _quotes.Where(q => q.Date <= weeklyQuotes.First().Date).Take(bars).ToList();

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
            Validate();

            if (indicators == null || indicators.Count == 0)
            {
                throw new ArgumentException("Indicators are not set");
            }
        }


        public bool Initialized()
        {
            return _initialized;
        }

        public void MoveNext(int bars)
        {
            Validate(bars);

            foreach (QuotePeriod period in Enum.GetValues(typeof(QuotePeriod)))
            {
                Charts[period].MoveNext(bars);
            }
        }

        public void MovePrev(int bars)
        {
            Validate(bars);

            foreach (QuotePeriod period in Enum.GetValues(typeof(QuotePeriod)))
            {
                Charts[period].MovePrev(bars);
            }
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


    }
}