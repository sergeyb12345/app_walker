using System;
using dream.walker.indicators.Enums;

namespace dream.walker.indicators.Models
{
    public class ImpulseSystemModel : IIndicatorModel
    {
        public DateTime Date { get; set; }
        public ImpulseType Value { get; set; }
    }
}