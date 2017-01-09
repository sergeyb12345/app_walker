using System;
using System.Collections.Generic;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartData
    {
        public ChartData()
        {
            Company = new CommpanyChartData();
            Indicators = new IndicatorsChartData();
            Replace = false;
        }


        public CommpanyChartData Company { get; set; }
        public IndicatorsChartData Indicators { get; set; }


        public bool Replace { get; private set; }

        public ChartData Next(QuotesModel nextQuotes)
        {
            Company.Quotes.Add(nextQuotes);

            return this;
        }
    }

    public class IndicatorsChartData : List<IndicatorChartData>
    {
        public IndicatorsChartData(IndicatorProcessorFactory indicatorProcessorFactory)
        {
            
        }

        public IndicatorsChartData(List<IndicatorChartData> data)
        {
            this.AddRange(data);
        }

        public HistoricalQuotes Quotes { get; set; }
        public List<Indicator> Indicators { get; set; }

        //Calculate only forward
        //Keep calculated bits in history and re-attach on prev move
        public void ReCalculate(HistoricalQuotes quotes, bool quotesReplace)
        {
            throw new NotImplementedException();
        }

        internal void ReCalculate()
        {
            throw new NotImplementedException();
        }
    }
}