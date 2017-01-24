using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Enums;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    /*
        PlaygroundChartModel = {
            company: {
                name: 'A - ACMA'
            },
            periods: [
                {
                    id: 1,
                    name: 'weekly',
                    quotes: [],
                    indicators: [
                        {
                            id: 1,
                            name: 'EMA(13)',
                            chartType: 'line',
                            values: [],
                            sharedPlot: 0, 
                        }
                    ],
                    update: {
                        mode: 'reset',
                        bars: 0
                    }
                },
                {
                    id: 0,
                    name: 'daily',
                    quotes: [],
                    indicators: [],
                    update: {
                        mode: 'insert | append',
                        bars: 2
                    }
                }
            ]
        };     
     */

    public class PlaygroundChartModel
    {
        public PlaygroundChartModel()
        {
            Company = new CompanyInfo();
            Periods = new List<ChartInfo>();
            RuleSets = new List<StrategyRuleResult>();
        }

        public List<StrategyRuleResult> RuleSets { get; set; }

        public CompanyInfo Company { get; set; }
        public List<ChartInfo> Periods { get; set; }
        public List<StrategyRuleResult> Rules { get; set; }

        public class ChartInfo
        {
            private readonly QuotePeriod _period;

            /// <summary>
            /// </summary>
            /// <param name="period"></param>
            /// <param name="model"></param>
            /// <param name="mode"></param>
            public ChartInfo(QuotePeriod period, ChartModel model, ChartUpdateMode mode)
            {
                _period = period;
                Id = (int) period;
                Name = period.ToString();

                Update = mode ?? new ChartUpdateMode(ChartUpdateMode.UpdateMode.Reset, null);
                Quotes = GetQuotes(model.Quotes, Update);

                Indicators = new List<IndicatorInfo>();

                foreach (var indicator in model.Indicators)
                {
                    Indicators.Add(new IndicatorInfo(indicator.Value, Update));    
                }
            }

            private List<QuotesModel> GetQuotes(HistoricalQuotes quotes, ChartUpdateMode update)
            {
                switch (update.ModeType)
                {
                    case ChartUpdateMode.UpdateMode.Reset:
                        return quotes;

                    case ChartUpdateMode.UpdateMode.Insert:
                        var endDate = update.Quotes.Last().Date;
                        return quotes.Where(q => q.Date <= endDate).ToList();

                    case ChartUpdateMode.UpdateMode.Append:
                        var startDate = update.Quotes.First().Date;
                        return quotes.Where(q => q.Date >= startDate).ToList();

                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }


            public int Id { get; set; }
            public string Name { get; set; }
            public List<QuotesModel> Quotes { get; set; }
            public ChartUpdateMode Update { get; set; }
            public List<IndicatorInfo> Indicators { get; set; }
        }


        public class CompanyInfo
        {
            public string Name { get; set; }
        }


        public class IndicatorInfo
        {
            public IndicatorInfo(IndicatorChartData chart, ChartUpdateMode update)
            {
                Name = chart.Indicator.ToString();
                ChartType = chart.Indicator.ChartType.ToString().ToLower();
                Values = chart.GetValues(update);
                Id = chart.Indicator.IndicatorId;
            }

            public int Id { get; set; }

            public string ChartType { get; set; }

            public string Name { get; set; }

            /// <summary>
            /// 0 - Price plot,
            /// -1 - Not shared
            /// > 0 - Shared with indicator id
            /// </summary>
            public int SharedPlot { get; set; }

            public List<IndicatorModel> Values { get; set; }
        }
    }
}