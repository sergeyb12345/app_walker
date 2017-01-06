using System.Collections.Generic;

namespace dream.walker.playground.Models
{
    public class ChartData
    {
        public ChartData()
        {
            Company = new CommpanyChartData();
            Indicators = new List<IndicatorChartData>();    
        }

        public CommpanyChartData Company { get; set; }
        public List<IndicatorChartData> Indicators { get; set; }

    }
}