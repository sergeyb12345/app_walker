using System;
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
        Task DeleteRuleAsync(int id);
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
                    record.Name = rule.Name;
                    record.Description = rule.Description;
                    record.Deleted = rule.Deleted;
                    record.Period = rule.Period;
                    record.DataSouceV1 = rule.DataSouceV1;
                    record.DataSouceV2 = rule.DataSouceV2;
                    record.DataSeriesV1 = rule.DataSeriesV1;
                    record.DataSeriesV2 = rule.DataSeriesV2;
                    record.ConstV1 = rule.ConstV1;
                    record.ConstV2 = rule.ConstV2;
                    record.TakeItemsV1 = rule.TakeItemsV1;
                    record.TakeItemsV2 = rule.TakeItemsV2;
                    record.SkipItemsV1 = rule.SkipItemsV1;
                    record.SkipItemsV2 = rule.SkipItemsV2;
                    record.TransformItemsV1 = rule.TransformItemsV1;
                    record.TransformItemsV2 = rule.TransformItemsV2;
                    record.Condition = rule.Condition;

                    await repository.CommitAsync();
                }

                return record;
            }
        }

        public async Task DeleteRuleAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleRepository>();
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
