using System;
using System.Collections.Generic;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
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
            ChartData = new ChartDataProcessor(historicalData, indicators, company, _indicatorProcessorFactory);
        }

        public void Reset(int bars, DateTime date)
        {
            ChartData.Initialize(bars, date);
        }

        public void Next(int bars)
        {
            ChartData.Next(bars);
        }

        public void Prev(int bars)
        {
            ChartData.Prev(bars);
        }
    }
}