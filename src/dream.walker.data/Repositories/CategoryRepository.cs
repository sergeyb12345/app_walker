using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Articles;

namespace dream.walker.data.Repositories
{
    public interface ICategoryRepository
    {
        Task<Category> GetAsync(int id);
        Category Add(Category category);
        Task CommitAsync();
        Task<List<Category>> GetBySectionIdAsync(int sectionId);
        Task<Category> GetAsync(string categoryUrl, bool withFallback);
        void Delete(Category record);
    }


    public class CategoryRepository : DreamDbRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Category> GetAsync(int id)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.CategoryId == id);
            return record;
        }

        public async Task<List<Category>> GetBySectionIdAsync(int sectionId)
        {
            var records = await Dbset.Where(r => r.SectionId == sectionId && !r.Deleted).ToListAsync();
            return records;
        }

        public async Task<Category> GetAsync(string categoryUrl, bool withFallback)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.Url == categoryUrl && !r.Deleted);
            if (record == null && withFallback)
            {
                record = await Dbset.Where(r => !r.Deleted).OrderBy(r=>r.OrderId).FirstOrDefaultAsync();
            }
            return record;
        }
    }
}