using System;

namespace dream.walker.indicators.Models
{
    public class MacdModel : IIndicatorModel
    {
        public DateTime Date { get; set; }
        public decimal Histogram { get; set; }
    }
}