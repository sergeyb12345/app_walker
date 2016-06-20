using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;

namespace dream.walker.data.Repositories
{
    public interface IIndicatorRepository
    {
        Indicator Get(int id);
        List<Indicator> GetAll();
        Indicator Add(Indicator indicator);
        void Commit();
    }


    public class IndicatorRepository : DreamDbRepository<Indicator>, IIndicatorRepository
    {
        public IndicatorRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Indicator Get(int id)
        {
            var record = Dbset.FirstOrDefault(r => r.IndicatorId == id);
            return record;
        }

        public List<Indicator> GetAll()
        {
            var indicators = Dbset.Where(i => !i.Deleted).ToList();
            return indicators;
        }
    }
}