using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace dream.walker.data.Repositories
{
    public interface IVStrategyRepository
    {
        Task<List<vStrategy>> GetAllAsync(bool includeDeleted);
        Task<List<vStrategy>> GetAsync(int id);
    }


    public class VStrategyRepository : DreamDbRepository<vStrategy>, IVStrategyRepository
    {
        public VStrategyRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<vStrategy>> GetAllAsync(bool includeDeleted)
        {
            var records = await Dbset.Where(r => !r.Deleted || includeDeleted ).OrderBy(r => r.StrategyName).ThenBy(r => r.OrderId).ToListAsync();
            return records;
        }

        public async Task<List<vStrategy>> GetAsync(int id)
        {
            var records = await Dbset.Where(r => r.StrategyId == id).OrderBy(r => r.OrderId).ToListAsync();
            return records;
        }

    }
}