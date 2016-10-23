using System.Collections.Generic;
using System.Linq;

namespace dream.walker.space.Services.Models
{
    public class ChartDataModel
    {
        private readonly List<ChartPlotData> _chartPlots = null;

        public ChartDataModel()
        {
            _chartPlots = new List<ChartPlotData>();
        }

        public ChartPlotData GetChartPlot(int chartPlotNumber)
        {
            var chartPlot = _chartPlots.FirstOrDefault(p => p.ChartPlotNumber == chartPlotNumber);
            if (chartPlot == null)
            {
                chartPlot = new ChartPlotData(chartPlotNumber);
                _chartPlots.Add(chartPlot);
            }
            return chartPlot;
        }
    }
}