using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Entities.Articles;
using dream.walker.data.Repositories;

namespace dream.walker.data.Services
{
    public class ArticleService: IArticleService
    {
        private readonly ILifetimeScope _container;

        public ArticleService(ILifetimeScope container)
        {
            _container = container;
        }


        public async Task<Article> GetArticle(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var entity = await repository.GetAsync(id);
                return entity;
            }
        }

        public async Task SaveArticle(Article article)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                Article record = null;
                var repository = scope.Resolve<IArticleRepository>();

                if (article.ArticleId == 0)
                {
                    record = repository.Add(new Article());
                }
                else
                {
                    record = await repository.GetAsync(article.ArticleId);
                }

                if (record != null)
                {
                    record.CategoryId = article.CategoryId;
                    record.Title = article.Title;
                    record.Url = article.Url;
                    record.JsonArticleBlocks = article.JsonArticleBlocks;

                    await repository.CommitAsync();
                }
            }
        }


        public async Task SaveCategory(Category category)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                Category record = null;
                var repository = scope.Resolve<ICategoryRepository>();

                if (category.CategoryId == 0)
                {
                    record = repository.Add(new Category());
                }
                else
                {
                    record = await repository.GetAsync(category.CategoryId);
                }

                if (record != null)
                {
                    record.SectionId = category.SectionId;
                    record.Title = category.Title;
                    record.Url = category.Url;
                    record.OrderId = category.OrderId;

                    await repository.CommitAsync();
                }
            }
        }

        public async Task<Article> GetFeaturedArticle(int categoryId)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var record = await repository.GetFeaturedAsync(categoryId);
                return record;
            }
        }

        public async Task SetFeaturedArticle(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var record = await repository.GetAsync(id);
                if (record != null)
                {
                    await repository.SetFeaturedAsync(id, record.CategoryId);
                }
            }
        }

        public List<Category> GetCategories(int sectionId)
        {
            throw new NotImplementedException();
        }

        public Task<Section> GetSection(string sectionUrl)
        {
            throw new NotImplementedException();
        }

        public List<Section> GetSections()
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetCategory(string categoryUrl)
        {
            throw new NotImplementedException();
        }

        public List<Article> GetArticles(int categoryId)
        {
            throw new NotImplementedException();
        }

        public Task<Article> GetArticle(int categoryId, string articleUrl)
        {
            throw new NotImplementedException();
        }

        public Task DeleteArticle(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateArticleOrder(int articleId, int orderId)
        {
            throw new NotImplementedException();
        }

        public Task DeleteCategory(int id)
        {
            throw new NotImplementedException();
        }
    }
}
