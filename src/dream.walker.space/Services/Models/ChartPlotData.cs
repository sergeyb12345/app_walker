using System.Collections.Generic;

namespace dream.walker.space.Services.Models
{
    public class ChartPlotData
    {
        public readonly List<ChartIndicator> ChartIndicators = null;

        public ChartPlotData(int chartPlotNumber)
        {
            ChartPlotNumber = chartPlotNumber;
            ChartIndicators = new List<ChartIndicator>();
        }

        public int ChartPlotNumber { get; private set; }

        public ChartIndicator AttachIndicator()
        {
            var ci = new ChartIndicator();
            ChartIndicators.Add(ci);

            return ci;
        }
    }
}