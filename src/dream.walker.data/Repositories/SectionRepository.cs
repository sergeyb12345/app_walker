using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Articles;

namespace dream.walker.data.Repositories
{
    public interface ISectionRepository
    {
        Task<Section> GetAsync(int id);
        Task<Section> GetAsync(string sectionUrl);
        Task<List<Section>> GetAsync(bool includeDeleted);
    }


    public class SectionRepository : DreamDbRepository<Section>, ISectionRepository
    {
        public SectionRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Section> GetAsync(int id)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.SectionId == id);
            return record;
        }

        public async Task<Section> GetAsync(string sectionUrl)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => string.Equals(r.Url, sectionUrl, StringComparison.CurrentCultureIgnoreCase));
            return record;
        }

        public async Task<List<Section>> GetAsync(bool includeDeleted)
        {
            var record = await Dbset.Where(r => !r.IsDeleted || includeDeleted).OrderBy(r => r.OrderId).ToListAsync();
            return record;
        }
    }
}