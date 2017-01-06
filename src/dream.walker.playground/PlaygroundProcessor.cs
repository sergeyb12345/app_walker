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
        }
    }
}