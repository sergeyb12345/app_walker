using System.Collections.Generic;

namespace dream.walker.space.Services.Models
{
    public class ChartPlotData
    {
        private readonly List<ChartIndicator> _chartIndicators = null;

        public ChartPlotData(int chartPlotNumber)
        {
            ChartPlotNumber = chartPlotNumber;
            _chartIndicators = new List<ChartIndicator>();
        }

        public int ChartPlotNumber { get; private set; }

        public ChartIndicator AttachIndicator()
        {
            var ci = new ChartIndicator();
            _chartIndicators.Add(ci);

            return ci;
        }
    }
}