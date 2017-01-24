using System.Collections.Generic;

namespace dream.walker.playground.Models
{
    public class StrategyRuleSetResult
    {
        public StrategyRuleSetResult(StrategyRuleResult rule)
        {
            Name = rule.RuleSetName;
            RuleSetId = rule.RuleSetId;
            Rules = new List<StrategyRuleResult>();

            Add(rule);
        }

        public int RuleSetId { get; private set; }
        public string Name { get; private set; }
        public List<StrategyRuleResult> Rules { get; private set; }


        public void Add(StrategyRuleResult rule)
        {
            Rules.Add(rule);
        }
    }
}