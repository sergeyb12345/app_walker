using dream.walker.data.Entities.Indicators;
using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Enums;
using System;
using Autofac;
using dream.walker.data.Repositories;
using dream.walker.data.Models;
using System.Linq;

namespace dream.walker.data.Services
{
    public interface IIndicatorService
    {
        Task<Indicator> GetIndicatorAsync(int id);
        Task<List<Indicator>> GetIndicatorsAsync(QuotePeriod period);
        Task<Indicator> SaveIndicatorAsync(Indicator model);
        Task DeleteIndicatorAsync(int id);
        Task<List<IndicatorCore>> GetIndicatorsAsync();
    }

    public class IndicatorService : IIndicatorService
    {
        private readonly ILifetimeScope _container;

        public IndicatorService(ILifetimeScope container)
        {
            _container = container;
        }


        public async Task<Indicator> GetIndicatorAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IIndicatorRepository>();
                var entity = await repository.GetAsync(id);
                return entity;
            }
        }

        public async Task DeleteIndicatorAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IIndicatorRepository>();
                var record = await repository.GetAsync(id);
                if (record != null)
                {
                    record.Deleted = true;
                    await repository.CommitAsync();
                }
            }
        }

        public async Task<List<Indicator>> GetIndicatorsAsync(QuotePeriod period)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IIndicatorRepository>();
                var entities = await repository.GetAllAsync(period);
                return entities;
            }
        }

        public async Task<Indicator> SaveIndicatorAsync(Indicator indicator)
        {
            if (indicator == null) return null;

            using (var scope = _container.BeginLifetimeScope())
            {
                Indicator record = null;
                var repository = scope.Resolve<IIndicatorRepository>();

                if (indicator.IndicatorId == 0)
                {
                    record = repository.Add(new Indicator());
                }
                else
                {
                    record = await repository.GetAsync(indicator.IndicatorId);
                }

                if (record != null)
                {
                    record.Name = indicator.Name;
                    record.Description = indicator.Description;
                    record.Deleted = indicator.Deleted;
                    record.Period = indicator.Period;
                    record.LastUpdated = DateTime.UtcNow;
                    record.ChartColor = indicator.ChartColor;
                    record.ChartPlotNumber = indicator.ChartPlotNumber;
                    record.ChartType = indicator.ChartType;
                    record.Params = indicator.Params;

                    await repository.CommitAsync();
                }

                return record;
            }
        }

        public async Task<List<IndicatorCore>> GetIndicatorsAsync()
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IIndicatorRepository>();
                var entities = await repository.GetAllAsync();
                var result = entities.Select(e => new IndicatorCore(e)).OrderBy(e => e.Name).ToList();

                return result;
            }
        }
    }
}
