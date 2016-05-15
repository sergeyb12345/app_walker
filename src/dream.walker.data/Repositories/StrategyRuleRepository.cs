using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;

namespace dream.walker.data.Repositories
{
    public interface IStrategyRuleRepository
    {
        StrategyRule Get(int strategyId, int ruleId);
        List<StrategyRule> Get(int strategyId);
    }


    public class StrategyRuleRepository : DreamDbRepository<StrategyRule>, IStrategyRuleRepository
    {
        public StrategyRuleRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public StrategyRule Get(int strategyId, int ruleId)
        {
            var record = Dbset.FirstOrDefault(r => r.StrategyId == strategyId && r.RuleId == ruleId);
            return record;
        }
        public List<StrategyRule> Get(int strategyId)
        {
            var record = Dbset.Where(r => r.StrategyId == strategyId).ToList();
            return record;
        }
    }
}