using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Entities.Articles;

namespace dream.walker.data.Services
{
    public interface IArticleService
    {
        Task<Article> GetArticleAsync(int articleId);
        Task SaveArticleAsync(Article article);
        Task SaveCategoryAsync(Category category);
        Task<Article> GetFeaturedArticleAsync(int categoryId);
        Task SetFeaturedArticleAsync(int articleId);
        Task<List<Category>> GetCategoriesAsync(int sectionId);
        Task<Section> GetSectionAsync(string sectionUrl);
        Task<List<Section>> GetSectionsAsync();
        Task<Category> GetCategoryAsync(string categoryUrl);
        Task<List<Article>> GetArticlesAsync(int categoryId);
        Task<Article> GetArticleAsync(int categoryId, string articleUrl);
        Task DeleteArticleAsync(int articleId);
        Task UpdateArticleOrderAsync(int articleId, int orderId);
        Task DeleteCategoryAsync(int categoryId);

    }
}
