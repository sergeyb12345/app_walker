using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;

namespace dream.walker.data.Repositories
{
    public interface IStrategyRepository
    {
        Strategy Get(int id);
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
    }
}