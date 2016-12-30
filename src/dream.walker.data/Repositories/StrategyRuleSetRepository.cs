using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;

namespace dream.walker.data.Repositories
{
    public interface IStrategyRuleSetRepository
    {
        StrategyRuleSet Get(int strategyId, int ruleId);
        Task<List<StrategyRuleSet>> GetAsync(int strategyId, QuotePeriod period);
        Task<List<StrategyRuleSet>> GetAsync(int strategyId);
        void Delete(StrategyRuleSet entity);
        Task CommitAsync();
        StrategyRuleSet Add(StrategyRuleSet strategyRuleSet);
    }


    public class StrategyRuleSetRepository : DreamDbRepository<StrategyRuleSet>, IStrategyRuleSetRepository
    {
        public StrategyRuleSetRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public StrategyRuleSet Get(int strategyId, int ruleSetId)
        {
            var record = Dbset.FirstOrDefault(r => r.StrategyId == strategyId && r.RuleSetId == ruleSetId);
            return record;
        }
        public async Task<List<StrategyRuleSet>> GetAsync(int strategyId, QuotePeriod period)
        {
            var query = @"
                SELECT S.*, R.[Name]
                FROM [dbo].[RuleSet] R
                INNER JOIN [dbo].[StrategyRuleSet] S
                ON R.[RuleSetId] = S.[RuleSetId]
                WHERE S.[StrategyId] = @strategyId AND R.[Period] = @period
                ORDER BY S.OrderId";


            var records = await DbContext.Database.SqlQuery<StrategyRuleSet>(query,
                new SqlParameter("@strategyId", strategyId),
                new SqlParameter("@period", (int)period)).ToListAsync();

            return records;
        }

        public async Task<List<StrategyRuleSet>> GetAsync(int strategyId)
        {
            var records = await Dbset.Where(r => r.StrategyId == strategyId).ToListAsync();
            return records;
        }
    }
}