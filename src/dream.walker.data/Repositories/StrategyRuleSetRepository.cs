using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Repositories
{
    public interface IStrategyRuleSetRepository
    {
        StrategyRuleSet Get(int strategyId, int ruleId);
        List<StrategyRuleSet> Get(int strategyId);
    }


    public class StrategyRuleRepository : DreamDbRepository<StrategyRuleSet>, IStrategyRuleSetRepository
    {
        public StrategyRuleRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public StrategyRuleSet Get(int strategyId, int ruleSetId)
        {
            var record = Dbset.FirstOrDefault(r => r.StrategyId == strategyId && r.RuleSetId == ruleSetId);
            return record;
        }
        public List<StrategyRuleSet> Get(int strategyId)
        {
            var record = Dbset.Where(r => r.StrategyId == strategyId).ToList();
            return record;
        }
    }
}