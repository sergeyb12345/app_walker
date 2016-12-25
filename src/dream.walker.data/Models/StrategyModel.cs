using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Models
{
    public class StrategyModel
    {
        public StrategyModel()
        {
            RuleSets = new List<StrategyRuleSetModel>();
        }

        public StrategyModel(Strategy strategy):this()
        {
            StrategyId = strategy.StrategyId;
            Title = strategy.Name;
            Active = strategy.Active;
            Url = strategy.Url;
            Deleted = strategy.Deleted;
            Summary = strategy.Description;
            Blocks = JsonConvert.DeserializeObject<List<dynamic>>(strategy.JsonArticleBlocks??String.Empty);
        }

        public StrategyModel(List<vStrategy> data, int strategyId) :this()
        {
            var header = data.FirstOrDefault(r => r.StrategyId == strategyId);
            if (header != null)
            {
                StrategyId = header.StrategyId;
                Title = header.StrategyName;
                Active = header.Active;
                Url = header.Url;
                Deleted = header.Deleted;
                Summary = header.StrategyDescription;
                Blocks = JsonConvert.DeserializeObject<List<dynamic>>(header.JsonArticleBlocks);

                foreach (var item in data.Where(r => r.StrategyId == strategyId))
                {
                    var details = new StrategyRuleSetModel
                    {
                        RuleSetId = item.RuleSetId,
                        Name = item.RuleSetName,
                        Description = item.RuleSetDescription,
                        Period = item.Period,
                        OrderId = item.OrderId,
                        Optional = item.Optional
                    };

                    RuleSets.Add(details);
                }
            }
        }

        public List<StrategyRuleSetModel> RuleSets { get; set; }
        public List<dynamic> Blocks { get; set; }
        public int StrategyId { get; set; }
        public string Title { get; set; }
        public bool Deleted { get; set; }
        public string Summary { get; set; }
        public bool Active { get; private set; }
        public string Url { get; private set; }
    }


}
