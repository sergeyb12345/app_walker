using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities.Indicators;
using dream.walker.indicators.Models;

namespace dream.walker.playground.Models
{
    public class IndicatorChartData
    {
        public IndicatorChartData()
        {
            Values = new List<IndicatorModel>();    
        }

        public IndicatorChartData(Indicator indicator)
            :this()
        {
            Name = $"{indicator.Name.ToUpper()} ({string.Join(",", indicator.Params.Select(p => p.Value).ToArray())})";
            ChartType = indicator.ChartType.ToString().ToLower();
            ChartColor = indicator.ChartColor;
            CompanyPlot = indicator.ChartPlotNumber == 0;
        }

        public IndicatorChartData(Indicator indicator, List<IndicatorModel> values)
            :this(indicator)
        {
            Values = values;
        }

        public bool CompanyPlot { get; set; }
        public string ChartColor { get; set; }
        public string ChartType { get; set; }
        public string Name { get; set; }
        public List<IndicatorModel> Values { get; set; }
    }
}