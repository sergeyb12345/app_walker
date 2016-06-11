using System;
using System.Collections.Generic;

namespace dream.walker.indicators.Models
{

    public class IndicatorModel : IIndicatorModel
    {
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
    }
}