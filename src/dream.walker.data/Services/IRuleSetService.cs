using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using Autofac;
using dream.walker.data.Repositories;
using dream.walker.data.Entities.Strategies;
using System.Linq;

namespace dream.walker.data.Services
{
    public interface IRuleSetService
    {
        Task<RuleSetModel> GetRuleSetAsync(int id);
        Task<List<RuleSetModel>> GetRuleSetsAsync(QuotePeriod period);
        Task<RuleSetModel> SaveRuleSetAsync(RuleSetModel model);
        Task DeleteRuleSetAsync(int id);
        Task<List<vStrategyRuleSet>> GetStrategyRuleSetsAsync(int id);
    }

    public class RuleSetService : IRuleSetService
    {
        private ILifetimeScope _container;

        public RuleSetService(ILifetimeScope container)
        {
            _container = container;
        }

        public async Task DeleteRuleSetAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var detailsRepository = scope.Resolve<IRuleSetDetailsRepository>();
                await detailsRepository.DeleteAsync(id);
                await detailsRepository.CommitAsync();

                var repository = scope.Resolve<IRuleSetRepository>();
                await repository.DeleteAsync(id);
                await repository.CommitAsync();
            }
        }

        public async Task<RuleSetModel> GetRuleSetAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IVRuleSetRepository>();
                var data = await repository.GetAsync(id);

                return new RuleSetModel(data, id);
            }
        }

        public async Task<List<RuleSetModel>> GetRuleSetsAsync(QuotePeriod period)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IVRuleSetRepository>();
                var data = await repository.GetAllAsync(period, false);
                var result = new List<RuleSetModel>();

                foreach (var item in data)
                {
                    if(result.All(r => r.RuleSetId != item.RuleSetId))
                    {
                        result.Add(new RuleSetModel(data, item.RuleSetId));
                    }
                }

                return result;
            }
        }

        public async Task<RuleSetModel> SaveRuleSetAsync(RuleSetModel model)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleSetRepository>();

                RuleSet ruleSet = null;

                if(model.RuleSetId > 0)
                {
                    ruleSet = await repository.GetAsync(model.RuleSetId);
                } else
                {
                    ruleSet = repository.Add(new RuleSet());
                }

                if(ruleSet != null)
                {
                    ruleSet.Name = model.Name;
                    ruleSet.Description = model.Description;
                    ruleSet.Deleted = model.Deleted;
                    ruleSet.Period = model.Period;

                    await repository.CommitAsync();

                    var detailsRepository = scope.Resolve<IRuleSetDetailsRepository>();
                    await detailsRepository.DeleteAsync(ruleSet.RuleSetId);
                    await detailsRepository.CommitAsync();

                    if (model.Rules.Any(r => !r.Deleted))
                    {
                        var orderId = 1;
                        foreach (var rule in model.Rules.Where(r => !r.Deleted))
                        {
                            var details = detailsRepository.Add(new RuleSetDetails());
                            details.RuleId = rule.RuleId;
                            details.OrderId = orderId;
                            details.RuleSetId = ruleSet.RuleSetId;

                            orderId += 1;
                        }
                        await detailsRepository.CommitAsync();
                    }


                    model.RuleSetId = ruleSet.RuleSetId;
                }


                return model;
            }
        }

        public async Task<List<vStrategyRuleSet>> GetStrategyRuleSetsAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IVStrategyRuleSetRepository>();
                var records = await repository.GetRuleSetsAsync(id);
                return records;
            }
        }
    }
}
