using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;
using System.Collections.Generic;
using System.Linq;

namespace dream.walker.data.Models
{
    public class RuleSetModel
    {
        public RuleSetModel()
        {
            Rules = new List<RuleModel>();
        }

        public RuleSetModel(List<vRuleSet> data, int ruleSetId) :this()
        {
            var header = data.FirstOrDefault(r => r.RuleSetId == ruleSetId);
            if (header != null)
            {
                RuleSetId = header.RuleSetId;
                Name = header.RuleSetName;
                Period = (QuotePeriod)header.Period;
                Deleted = header.Deleted;
                Description = header.Description;

                foreach (var item in data.Where(r => r.RuleSetId == RuleSetId))
                {
                    var details = new RuleModel
                    {
                        RuleId = item.RuleId,
                        Name = item.RuleName,
                        OrderId = item.OrderId,
                        Description = item.RuleDescription,
                        RuleSetId = RuleSetId
                    };
                    Rules.Add(details);
                }
            }
        }

        public List<RuleModel> Rules { get; set; }

        public QuotePeriod Period { get; set; }
        public int RuleSetId { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public string Description { get; set; }
    }
}
