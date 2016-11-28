using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac;
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
    }
}
