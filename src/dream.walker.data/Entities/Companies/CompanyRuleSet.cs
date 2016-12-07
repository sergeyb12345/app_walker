using System;
using System.ComponentModel.DataAnnotations.Schema;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Entities.Companies
{
    public class CompanyRuleSet
    {
        public string Ticker { get; set; }
        public int RuleSetId { get; set; }
        public bool IsValid { get; set; }
        public DateTime LastUpdated { get; set; }

        [ForeignKey("RuleSetId")]
        public virtual RuleSet RuleSet { get; set; }

    }
}