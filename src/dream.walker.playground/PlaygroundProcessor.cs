using System;
using System.Collections.Generic;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.playground.Models;
using dream.walker.data.Entities.Companies;

namespace dream.walker.playground
{
    public class PlaygroundProcessor
    {
        private readonly List<Indicator> _indicators;
        private readonly PlaygroundModel _playgroundModel;


        public PlaygroundProcessor(Company company, List<Indicator> indicators, IndicatorProcessorFactory indicatorProcessorFactory)
        {
            _indicators = indicators;
            _playgroundModel = new PlaygroundModel(company, indicatorProcessorFactory);
            HistoryDays = company.HistoryQuotes.Count;
        }

        public int HistoryDays { get; private set; }


        public PlaygroundChartModel Initialize(int bars, DateTime date)
        {
            _playgroundModel.Initialize(bars, date, _indicators);
            return _playgroundModel.Build();
        }


        public PlaygroundChartModel Next(int bars)
        {
            _playgroundModel.MoveNext(bars);
            return _playgroundModel.Build(new ChartUpdateMode(ChartUpdateMode.UpdateMode.Append, bars));
        }

        public PlaygroundChartModel Prev(int bars)
        {
            _playgroundModel.MovePrev(bars);
            return _playgroundModel.Build(new ChartUpdateMode(ChartUpdateMode.UpdateMode.Insert, bars));
        }


    }
}