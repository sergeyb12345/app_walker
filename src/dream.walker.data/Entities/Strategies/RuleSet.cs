using dream.walker.data.Enums;

namespace dream.walker.data.Entities.Strategies
{
    public class RuleSet
    {
        public int RuleSetId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }
        public QuotePeriod Period { get; set; }
    }
}