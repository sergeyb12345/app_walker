using System.Collections.Generic;
using dream.walker.data.Entities.Indicators;
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
        }

        public CompanyInfo Company { get; set; }
        public List<ChartInfo> Periods { get; set; }

        public class ChartInfo
        {
            public ChartInfo(QuotePeriod period, List<QuotesModel> quotes)
            {
                Id = (int) period;
                Name = period.ToString();
                Quotes = quotes;
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
        public class ChartUpdateMode
        {
            public ChartUpdateMode(UpdateMode mode, int bars)
            {
                Mode = mode.ToString().ToLower();
                Bars = bars;

            }

            public string Mode { get; set; }
            public int Bars { get; set; }
        }

        public enum UpdateMode
        {
            Reset,
            Insert,
            Append
        }

        public class IndicatorInfo
        {
            public IndicatorInfo(Indicator indicator)
            {
                Name = indicator.ToString();
                ChartType = indicator.ChartType.ToString().ToLower();
                Values = new List<IndicatorModel>();
                Id = indicator.IndicatorId;
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