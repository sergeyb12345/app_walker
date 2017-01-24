using System;
using System.Collections.Generic;
using System.Linq;

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
        public int Progress { get; private set; }
        public List<StrategyRuleResult> Rules { get; private set; }


        public void Add(StrategyRuleResult rule)
        {
            Rules.Add(rule);

            var totalValid = Rules.Count(r => r.Valid) * 1.0;
            Progress = (int)(totalValid / Rules.Count * 100);
        }
    }
}