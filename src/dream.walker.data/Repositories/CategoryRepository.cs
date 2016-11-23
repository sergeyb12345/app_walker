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
    }
}