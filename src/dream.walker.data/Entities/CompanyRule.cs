using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace dream.walker.data.Entities
{
    public class CompanyRule
    {
        public string Ticker { get; set; }
        public int RuleId { get; set; }
        public bool IsValid { get; set; }
        public DateTime LastUpdated { get; set; }

        [ForeignKey("RuleId")]
        public virtual Rule Rule { get; set; }

    }
}