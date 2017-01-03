using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.data.Models
{
    public class StrategyRuleSetModel
    {
        public StrategyRuleSetModel()
        {
            Rules = new List<StrategyRuleModel>();
        }

        public List<StrategyRuleModel> Rules { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public bool Optional { get; set; }
        public int OrderId { get; set; }
        public int Period { get; set; }
        public int RuleSetId { get; set; }
    }

    public class StrategyRuleModel
    {
    }
}
