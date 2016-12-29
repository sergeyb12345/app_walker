using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.data.Entities.Strategies
{
    [Table("vStrategyRuleSet")]
    public class vStrategyRuleSet
    {
        public int StrategyId { get; set; }
        public bool StrategyActive { get; set; }
        public int RuleSetId { get; set; }
        public string RuleSetName { get; set; }
        public string RuleSetDescription { get; set; }
        public int RuleSetPeriod { get; set; }
        public int RuleSetOrderId { get; set; }
        public bool RuleSetOptional { get; set; }
    }
}
