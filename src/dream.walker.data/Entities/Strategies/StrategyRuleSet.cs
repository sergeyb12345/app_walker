using System.ComponentModel.DataAnnotations.Schema;

namespace dream.walker.data.Entities.Strategies
{
    public class StrategyRuleSet
    {
        public int StrategyId { get; set; }
        public int RuleSetId { get; set; }
        public bool Deleted { get; set; }
        public int OrderId { get; set; }
        public bool Optional { get; set; }

        [NotMapped]
        public string Name { get; set; }

        [ForeignKey("RuleSetId")]
        public virtual RuleSet RuleSet { get; set; }

        [ForeignKey("StrategyId")]
        public virtual Strategy Strategy { get; set; }
    }
}