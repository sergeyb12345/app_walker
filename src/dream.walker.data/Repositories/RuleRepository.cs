using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;

namespace dream.walker.data.Repositories
{
    public interface IRuleRepository
    {
        Task<List<Rule>> GetAllAsync(QuotePeriod period, bool includeDeleted);
        Rule Add(Rule rule);
        Task<Rule> GetAsync(int ruleId);
        Task CommitAsync();
    }


    public class RuleRepository : DreamDbRepository<Rule>, IRuleRepository
    {
        public RuleRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Rule>> GetAllAsync(QuotePeriod period, bool includeDeleted)
        {
            var records = await Dbset.Where(r => r.Period == period && ( !r.Deleted || includeDeleted )).OrderBy(r => r.Name).ToListAsync();
            return records;
        }

        public async Task<Rule> GetAsync(int ruleId)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.RuleId == ruleId);
            return record;
        }
    }
}