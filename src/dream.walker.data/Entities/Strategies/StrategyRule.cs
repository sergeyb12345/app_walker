using System.ComponentModel.DataAnnotations.Schema;

namespace dream.walker.data.Entities.Strategies
{
    public class StrategyRule
    {
        public int StrategyId { get; set; }
        public int RuleId { get; set; }
        public bool Deleted { get; set; }

        [ForeignKey("RuleId")]
        public virtual Rule Rule { get; set; }

        [ForeignKey("StrategyId")]
        public virtual Strategy Strategy { get; set; }
    }
}