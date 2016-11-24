using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Articles;

namespace dream.walker.data.Repositories
{
    public interface IArticleRepository
    {
        Task<Article> GetAsync(int id);
        Task CommitAsync();
        Article Add(Article article);
        Task<Article> GetFeaturedAsync(int categoryId, bool withFallback);
        Task SetFeaturedAsync(int articleId, int recordCategoryId);
        Task<List<Article>> GetByCategoryAsync(int categoryId);
        Task<Article> GetByCategoryAsync(int categoryId, string articleUrl);
        void Delete(Article record);
    }


    public class ArticleRepository : DreamDbRepository<Article>, IArticleRepository
    {
        public ArticleRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Article> GetAsync(int id)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.ArticleId == id);
            return record;
        }

        public async Task<Article> GetFeaturedAsync(int categoryId, bool withFallback)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.CategoryId == categoryId && r.IsFeatured);
            if (record == null && withFallback)
            {
                record = await Dbset.Where(r => r.CategoryId == categoryId).OrderBy(r => r.OrderId).FirstOrDefaultAsync();
            }
            return record;
        }

        public async Task SetFeaturedAsync(int articleId, int categoryId)
        {
            var sql = "UPDATE dbo.Articles SET IsFeatured = CASE WHEN ArticleId = @ArticleId THEN 1 ELSE 0 END WHERE CategoryId = @CategoryId";
            var parameters = new List<SqlParameter>
            {
                new SqlParameter("@ArticleId", articleId),
                new SqlParameter("@CategoryId", categoryId)
            };

            await DbContext.Database.ExecuteSqlCommandAsync(sql, parameters);
        }

        public async Task<List<Article>> GetByCategoryAsync(int categoryId)
        {
            var record = await Dbset.Where(r => r.CategoryId == categoryId).OrderBy(r => r.OrderId).ToListAsync();
            return record;
        }

        public async Task<Article> GetByCategoryAsync(int categoryId, string articleUrl)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.CategoryId == categoryId && r.Url.ToLower() == articleUrl.ToLower());
            if (record == null)
            {
                return await GetFeaturedAsync(categoryId, true);
            }
            return record;
        }
    }
}