using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Repositories
{
    public interface IStrategyRepository
    {
        Strategy Get(int id);
        Task<List<Strategy>> GetAllAsync(bool includeDeleted);
        Task<Strategy> GetByUrlAsync(string url);
        Strategy Add(Strategy strategy);
        Task<Strategy> GetAsync(int strategyId);
        Task CommitAsync();
    }


    public class StrategyRepository : DreamDbRepository<Strategy>, IStrategyRepository
    {
        public StrategyRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Strategy Get(int id)
        {
            var record = Dbset.FirstOrDefault(r => r.StrategyId == id);
            return record;
        }

        public async Task<List<Strategy>> GetAllAsync(bool includeDeleted)
        {
            var records = await Dbset.Where(r => !r.Deleted || includeDeleted).OrderBy(r => r.Name).ToListAsync();
            return records;
        }

        public async Task<Strategy> GetByUrlAsync(string url)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.Url.ToLower() == url.ToLower());
            return record;
        }

        public async Task<Strategy> GetAsync(int strategyId)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.StrategyId == strategyId);
            return record;
        }
    }
}