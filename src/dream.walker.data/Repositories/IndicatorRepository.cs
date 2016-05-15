using System.Linq;
using dream.walker.data.Entities;

namespace dream.walker.data.Repositories
{
    public interface IIndicatorRepository
    {
        Indicator Get(int id);
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
    }


}