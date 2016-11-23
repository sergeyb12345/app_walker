using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.data.Entities.Articles;

namespace dream.walker.data.Services
{
    public interface IArticleService
    {
        Task<Article> GetArticle(int id);
        Task SaveArticle(Article article);
        Task SaveCategory(Category category);
        Task<Article> GetFeaturedArticle(int categoryId);
        Task SetFeaturedArticle(int id);
        List<Category> GetCategories(int sectionId);
        Task<Section> GetSection(string sectionUrl);
        List<Section> GetSections();
        Task<Category> GetCategory(string categoryUrl);
        List<Article> GetArticles(int categoryId);
        Task<Article> GetArticle(int categoryId, string articleUrl);
        Task DeleteArticle(int id);
        Task UpdateArticleOrder(int articleId, int orderId);
        Task DeleteCategory(int id);

    }
}
