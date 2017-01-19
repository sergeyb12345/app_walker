using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Repositories
{
    public interface IVStrategyRuleRepository
    {
        Task<List<vStrategyRule>> GetRulesAsync(int strategyId);
    }


    public class VStrategyRuleRepository : DreamDbRepository<vStrategyRule>, IVStrategyRuleRepository
    {
        public VStrategyRuleRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<vStrategyRule>> GetRulesAsync(int strategyId)
        {
            var records = await Dbset.Where(r => r.StrategyId == strategyId).OrderBy(r => r.OrderId).ThenBy(r => r.RuleSetId).ToListAsync();
            return records;
        }

    }
}