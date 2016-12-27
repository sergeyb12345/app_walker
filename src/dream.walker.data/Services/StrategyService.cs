using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Helpers;
using dream.walker.data.Models;
using dream.walker.data.Repositories;
using Newtonsoft.Json;

namespace dream.walker.data.Services
{
    public class StrategyService: IStrategyService
    {
        private readonly ILifetimeScope _container;

        public StrategyService(ILifetimeScope container)
        {
            _container = container;
        }

        public async Task<List<StrategySummary>> GetStrategiesAsync()
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRepository>();
                var records = await repository.GetAllAsync(false);

                return records.Select(r => new StrategySummary(r)).OrderBy(s => s.Title).ToList();
            }
        }

        public async Task<StrategyModel> GetStrategyByUrlAsync(string url)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRepository>();
                var records = await repository.GetByUrlAsync(url);
                return records;
            }
        }

        public async Task<StrategyModel> SaveStrategyAsync(StrategyModel model)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                Strategy record = null;
                var repository = scope.Resolve<IStrategyRepository>();

                if (model.StrategyId == 0)
                {
                    record = repository.Add(new Strategy());
                }
                else
                {
                    record = await repository.GetAsync(model.StrategyId);
                }

                if (record != null)
                {
                    //model.Url = Slug.Create(true, model.Title);
                    record.Name = model.Title;
                    record.Url = model.Url;
                    record.Deleted = model.Deleted;
                    record.Description = model.Summary;
                    record.Active = model.Active;
                    record.JsonArticleBlocks = JsonConvert.SerializeObject(model.Blocks);

                    await repository.CommitAsync();

                    model.StrategyId = record.StrategyId;
                }

                return model;
            }
        }

        public async Task<Strategy> GetStrategyAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRepository>();
                var record = await repository.GetAsync(id);
                return record;
            }
        }

        public async Task DeleteStrategyAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRepository>();
                var record = await repository.GetAsync(id);
                if (record != null)
                {
                    record.Deleted = true;
                    await repository.CommitAsync();
                }
            }
        }
    }
}
