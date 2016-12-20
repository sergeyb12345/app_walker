using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using Autofac;
using dream.walker.data.Repositories;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Services
{
    public interface IRuleSetService
    {
        Task<RuleSetModel> GetRuleSetAsync(int id);
        Task<List<RuleSetModel>> GetRuleSetsAsync(QuotePeriod period);
        Task<RuleSetModel> SaveRuleSetAsync(RuleSetModel model);
        Task DeleteRuleSetAsync(int id);
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
                var repository = scope.Resolve<IRuleSetRepository>();
                var record = await repository.GetAsync(id);
                if (record != null)
                {
                    record.Deleted = true;
                    await repository.CommitAsync();
                }
            }
        }

        public async Task<RuleSetModel> GetRuleSetAsync(int id)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleSetRepository>();
                var header = await repository.GetAsync(id);

                var detailsRepository = scope.Resolve<IRuleSetDetailsRepository>();
                var details = await detailsRepository.GetAsync(id);

                return new RuleSetModel
                {
                    Header = header,
                    Details = details
                };
            }
        }

        public async Task<List<RuleSetModel>> GetRuleSetsAsync(QuotePeriod period)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IRuleSetRepository>();
                var headers = await repository.GetAsync(period, false);
                var result = new List<RuleSetModel>();

                if (headers != null)
                {
                    var detailsRepository = scope.Resolve<IRuleSetDetailsRepository>();

                    foreach (var header in headers)
                    {
                        var details = await detailsRepository.GetAsync(header.RuleSetId);
                        var item = new RuleSetModel
                        {
                            Header = header,
                            Details = details ?? new List<RuleSetDetails>()
                        };

                        result.Add(item);
                    }
                }

                return result;
            }
        }

        public Task<RuleSetModel> SaveRuleSetAsync(RuleSetModel model)
        {
            throw new NotImplementedException();
        }
    }
}
