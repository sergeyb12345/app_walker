using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Repositories
{
    public interface IRuleRepository
    {
        Rule Get(int id);
        Task<List<Rule>> GetAllAsync(bool includeDeleted);
        Rule Add(Rule rule);
        Task<Rule> GetAsync(int ruleId);
        Task CommitAsync();
    }


    public class RuleRepository : DreamDbRepository<Rule>, IRuleRepository
    {
        public RuleRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Rule Get(int id)
        {
            var record = Dbset.FirstOrDefault(r => r.RuleId == id);
            return record;
        }

        public async Task<List<Rule>> GetAllAsync(bool includeDeleted)
        {
            var records = await Dbset.Where(r => !r.Deleted || includeDeleted).OrderBy(r => r.Name).ToListAsync();
            return records;
        }

        public async Task<Rule> GetAsync(int ruleId)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.RuleId == ruleId);
            return record;
        }
    }
}