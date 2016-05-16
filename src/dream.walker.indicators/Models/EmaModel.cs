using System;

namespace dream.walker.indicators.Models
{
    public class EmaModel: IIndicatorModel
    {
        public DateTime Date { get;  set; }
        public decimal Value { get;  set; }
    }
}