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
        Task<Article> GetFeaturedAsync(int categoryId);
        Task SetFeaturedAsync(int articleId, int recordCategoryId);
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

        public async Task<Article> GetFeaturedAsync(int categoryId)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.CategoryId == categoryId && r.IsFeatured);
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
    }
}