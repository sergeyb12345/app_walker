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
        Task<Rule> SaveRuleAsync(Rule model);
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

        public async Task<Rule> SaveRuleAsync(Rule rule)
        {
            if (rule == null) return null;

            using (var scope = _container.BeginLifetimeScope())
            {
                Rule record = null;
                var repository = scope.Resolve<IRuleRepository>();

                if (rule.RuleId == 0)
                {
                    record = repository.Add(new Rule());
                }
                else
                {
                    record = await repository.GetAsync(rule.RuleId);
                }

                if (record != null)
                {
                    //record.CategoryId = article.CategoryId;
                    //record.Title = article.Title;
                    //record.Url = article.Url;
                    //record.JsonArticleBlocks = article.JsonArticleBlocks;

                    await repository.CommitAsync();
                }

                return record;
            }
        }
    }

}
