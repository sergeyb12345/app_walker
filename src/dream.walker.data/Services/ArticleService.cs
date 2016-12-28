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


        public async Task<Article> GetArticleAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var entity = await repository.GetAsync(id);
                return entity;
            }
        }

        public async Task SaveArticleAsync(Article article)
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


        public async Task SaveCategoryAsync(Category category)
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

        public async Task<Article> GetFeaturedArticleAsync(int categoryId)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var record = await repository.GetFeaturedAsync(categoryId, true);
                return record;
            }
        }

        public async Task SetFeaturedArticleAsync(int id)
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

        public async Task<List<Category>> GetCategoriesAsync(int sectionId)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICategoryRepository>();
                var records = await repository.GetBySectionIdAsync(sectionId);

                return records;
            }
        }

        public async Task<Section> GetSectionAsync(string sectionUrl)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ISectionRepository>();
                var record = await repository.GetAsync(sectionUrl);

                return record;
            }
        }

        public async Task<List<Section>> GetSectionsAsync()
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ISectionRepository>();
                var record = await repository.GetAsync(false);

                return record;
            }
        }

        public async Task<Category> GetCategoryAsync(string categoryUrl)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICategoryRepository>();
                var record = await repository.GetAsync(categoryUrl, true);

                return record;
            }
        }

        public async Task<List<Article>> GetArticlesAsync(int categoryId)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var records = await repository.GetByCategoryAsync(categoryId);
                return records;
            }
        }

        public async Task<Article> GetArticleAsync(int categoryId, string articleUrl)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var record = await repository.GetByCategoryAsync(categoryId, articleUrl);
                return record;
            }
        }

        public async Task DeleteArticleAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var record = await repository.GetAsync(id);
                if (record != null)
                {
                    record.Deleted = true;
                    await repository.CommitAsync();
                }
            }
        }

        public async Task UpdateArticleOrderAsync(int articleId, int orderId)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IArticleRepository>();
                var record = await repository.GetAsync(articleId);
                if (record != null)
                {
                    record.OrderId = orderId;
                    await repository.CommitAsync();
                }
            }
        }

        public async Task DeleteCategoryAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICategoryRepository>();
                var record = await repository.GetAsync(id);
                if (record != null)
                {
                    repository.Delete(record);
                    await repository.CommitAsync();
                }
            }
        }
    }
}
