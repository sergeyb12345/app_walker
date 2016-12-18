using System;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using System.Linq;

namespace dream.walker.data.Models
{
    public class IndicatorCore
    {
        public IndicatorCore()
        {

        }

        public IndicatorCore(Indicator indicator )
        {
            Name = GenerateName(indicator);
            IndicatorId = indicator.IndicatorId;
            Period = indicator.Period;
        }

        private string GenerateName(Indicator indicator)
        {
            var parameters = indicator.Params.Select(p => p.Value).ToArray();

            return $"{indicator.Name} ({string.Join(",", parameters)}) - {indicator.Period.ToString()}";
        }

        public string Name { get; set; }
        public int IndicatorId { get; set; }
        public QuotePeriod  Period { get; set; }
    }
}
