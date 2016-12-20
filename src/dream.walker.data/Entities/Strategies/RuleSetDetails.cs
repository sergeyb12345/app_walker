using System.ComponentModel.DataAnnotations.Schema;

namespace dream.walker.data.Entities.Strategies
{
    public class RuleSetDetails
    {
        public int RuleSetId { get; set; }
        public int RuleId { get; set; }
        public int OrderId { get; set; }

        [ForeignKey("RuleSetId")]
        public virtual RuleSet RuleSet { get; set; }

        [ForeignKey("RuleId")]
        public virtual Rule Rule { get; set; }
    }
}