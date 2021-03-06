using System;
using System.Collections.Generic;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.playground.Models;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.playground
{
    public class PlaygroundProcessor
    {
        private readonly List<Indicator> _indicators;
        private readonly PlaygroundModel _playgroundModel;


        public PlaygroundProcessor(Company company, List<Indicator> indicators, IndicatorProcessorFactory indicatorProcessorFactory, List<vStrategyRule> rules)
        {
            _indicators = indicators;
            _playgroundModel = new PlaygroundModel(company, indicatorProcessorFactory, rules);
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
            var appendedQuotes = _playgroundModel.MoveNext(bars);
            var model = _playgroundModel.Build(new ChartUpdateMode(ChartUpdateMode.UpdateMode.Append, appendedQuotes));

            return model;
        }


        public PlaygroundChartModel Prev(int bars)
        {
            var insertedQuotes = _playgroundModel.MovePrev(bars);
            var model = _playgroundModel.Build(new ChartUpdateMode(ChartUpdateMode.UpdateMode.Insert, insertedQuotes));

            return model;
        }


    }
}