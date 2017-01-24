using System;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;

namespace dream.walker.playground.Models
{
    public class StrategyRuleResult
    {

        public StrategyRuleResult(vStrategyRule rule)
        {
            Initialize(rule);
        }

        private void Initialize(vStrategyRule rule)
        {
            Condition = rule.Condition;
            RuleName = rule.RuleName;
            RuleSetName = rule.RuleSetName;
            RuleSetId = rule.RuleSetId;
            RuleId = rule.RuleId;
        }

        public CompareOperator Condition { get; private set; }
        public int RuleSetId { get; private set; }
        public int RuleId { get; private set; }
        public string RuleName { get; private set; }
        public string RuleSetName { get; private set; }
        public decimal FirstValue { get; private set; }
        public decimal SecondValue { get; private set; }
        public bool Valid { get; private set; }

        public void Compare(decimal firstValue, decimal secondValue)
        {
            FirstValue = firstValue;
            SecondValue = secondValue;

            switch (Condition)
            {
                case CompareOperator.Greater:
                    Valid = FirstValue > SecondValue;
                    break;
                case CompareOperator.GreaterOrEqual:
                    Valid = FirstValue >= SecondValue;
                    break;
                case CompareOperator.Equal:
                    Valid = FirstValue == SecondValue;
                    break;
                case CompareOperator.Less:
                    Valid = FirstValue < SecondValue;
                    break;
                case CompareOperator.LessOrEqual:
                    Valid = FirstValue <= SecondValue;
                    break;
                case CompareOperator.NotEqual:
                    Valid = FirstValue != SecondValue;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }

    }
}