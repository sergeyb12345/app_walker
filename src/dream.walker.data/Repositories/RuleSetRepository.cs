using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;

namespace dream.walker.data.Repositories
{
    public interface IRuleSetRepository
    {
        RuleSet Get(int id);
        RuleSet Add(RuleSet ruleSet);
        Task<RuleSet> GetAsync(int ruleSetId);
        Task CommitAsync();
        Task<List<RuleSet>> GetAsync(QuotePeriod period, bool includeDeleted);
    }


    public class RuleSetRepository : DreamDbRepository<RuleSet>, IRuleSetRepository
    {
        public RuleSetRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public RuleSet Get(int id)
        {
            var record = Dbset.FirstOrDefault(r => r.RuleSetId == id);
            return record;
        }

        public async Task<List<RuleSet>> GetAsync(QuotePeriod period, bool includeDeleted)
        {
            var records = await Dbset.Where(r => !r.Deleted || includeDeleted && r.Period == period).OrderBy(r => r.Name).ToListAsync();
            return records;
        }


        public async Task<RuleSet> GetAsync(int ruleSetId)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.RuleSetId == ruleSetId);
            return record;
        }
    }
}