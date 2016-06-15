using System.Collections.Generic;
using Autofac;
using dream.walker.data.Entities;
using dream.walker.data.Models;
using dream.walker.data.Repositories;

namespace dream.walker.data.Services
{
    public class CompanyIndicatorService : ICompanyIndicatorService
    {
        private readonly ILifetimeScope _container;

        public CompanyIndicatorService(ILifetimeScope container)
        {
            _container = container;
        }

        public List<CompanyToProcess> FindCompaniesToProcess(int maxCompanyCount)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICompanyRepository>();
                var companies = repository.FindCompaniesToCalculate(maxCompanyCount);
                return companies;
            }
        }

        public List<Indicator> GetRegisteredIndicators()
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IIndicatorRepository>();
                var indicators = repository.GetAll();
                return indicators;
            }
        }

        public void Update(string ticker, string jsonData, Indicator indicator)
        {
            throw new System.NotImplementedException();
        }

        public List<CompanyIndicator> GetIndicators(string ticker)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICompanyIndicatorRepository>();
                var indicators = repository.Get(ticker);
                return indicators;
            }
        }
    }
}