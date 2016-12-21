using dream.walker.data.Entities.Strategies;
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
                Period = header.Period;
                Deleted = header.Deleted;
                Description = header.Description;

                foreach (var item in data.Where(r => r.RuleSetId == RuleSetId))
                {
                    var details = new RuleModel
                    {
                        RuleId = item.RuleId,
                        RuleName = item.RuleName,
                        OrderId = item.OrderId
                    };
                    Rules.Add(details);
                }
            }
        }

        public List<RuleModel> Rules { get; set; }

        public int Period { get; set; }
        public int RuleSetId { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public string Description { get; set; }
    }
}
