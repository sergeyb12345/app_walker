using System.Collections.Generic;
using System.Linq;

namespace dream.walker.space.Services.Models
{
    public class ChartDataModel
    {
        public readonly List<ChartPlotData> ChartPlots = null;

        public ChartDataModel()
        {
            ChartPlots = new List<ChartPlotData>();
        }

        public ChartPlotData GetChartPlot(int chartPlotNumber)
        {
            var chartPlot = ChartPlots.FirstOrDefault(p => p.ChartPlotNumber == chartPlotNumber);
            if (chartPlot == null)
            {
                chartPlot = new ChartPlotData(chartPlotNumber);
                ChartPlots.Add(chartPlot);
            }
            return chartPlot;
        }
    }
}