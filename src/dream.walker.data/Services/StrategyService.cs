﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Entities.Articles;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Repositories;

namespace dream.walker.data.Services
{
    public class StrategyService: IStrategyService
    {
        private readonly ILifetimeScope _container;

        public StrategyService(ILifetimeScope container)
        {
            _container = container;
        }

        public async Task<List<Strategy>> GetStrategiesAsync(bool includeDeleted)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRepository>();
                var records = await repository.GetAllAsync(includeDeleted);
                return records;
            }
        }

        public async Task<Strategy> GetStrategyByUrlAsync(string url)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRepository>();
                var records = await repository.GetByUrlAsync(url);
                return records;
            }
        }

        public async Task<Strategy> SaveStrategyAsync(Strategy model)
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
                    record.Name = model.Name;
                    record.Url = model.Url;
                    record.Description = model.Description;
                    record.Deleted = model.Deleted;
                    await repository.CommitAsync();
                }

                return record;
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
    }
}
