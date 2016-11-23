using System.Linq;
using dream.walker.data.Entities.Articles;

namespace dream.walker.data.Repositories
{
    public interface ISectionRepository
    {
        Section Get(int id);
    }


    public class SectionRepository : DreamDbRepository<Section>, ISectionRepository
    {
        public SectionRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Section Get(int id)
        {
            var record = Dbset.FirstOrDefault(r => r.SectionId == id);
            return record;
        }
    }
}