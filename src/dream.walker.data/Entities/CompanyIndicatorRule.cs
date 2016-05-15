using System;

namespace dream.walker.data.Entities
{
    public class CompanyIndicatorRule
    {
        public string Ticker { get; set; }
        public int IndicatorRuleId { get; set; }
        public bool Valid { get; set; }
        public DateTime LastUpdated { get; set; }

    }
}