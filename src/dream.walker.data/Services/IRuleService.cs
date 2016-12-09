using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;
using dream.walker.data.Repositories;

namespace dream.walker.data.Services
{
    public interface IRuleService
    {
        Task<Rule> GetRuleAsync(int id);
        Task<List<RuleSet>> GetRuleSetsAsync(QuotePeriod period, bool includeDeleted);
        Task<List<StrategyRuleSet>> GetStrategyRuleSetsAsync(int strategyId, QuotePeriod period);
        Task<List<Rule>> GetRules(QuotePeriod period);
    }


    public class RuleService:  IRuleService
    {
        private readonly ILifetimeScope _container;

        public RuleService(ILifetimeScope container)
        {
            _container = container;
        }


        public async Task<Rule> GetRuleAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleRepository>();
                var entity = await repository.GetAsync(id);
                return entity;
            }
        }

        public async Task<List<RuleSet>> GetRuleSetsAsync(QuotePeriod period, bool includeDeleted)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleSetRepository>();
                var entities = await repository.GetAsync(period, includeDeleted);
                return entities;
            }
        }

        public async Task<List<StrategyRuleSet>> GetStrategyRuleSetsAsync(int strategyId, QuotePeriod period)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IStrategyRuleSetRepository>();
                var entities = await repository.GetAsync(strategyId, period);
                return entities;
            }
        }

        public async Task<List<Rule>> GetRules(QuotePeriod period)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleRepository>();
                var entities = await repository.GetAllAsync(period, false);
                return entities;
            }
        }
    }

}
