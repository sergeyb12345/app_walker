using System;
using System.Collections.Generic;
using Autofac;
using dream.walker.data.Entities;
using dream.walker.data.Managers;
using dream.walker.data.Models;
using dream.walker.data.Repositories;
using dream.walker.data.Requests;
using dream.walker.reader.Models;

namespace dream.walker.data.Services
{
    public class CompanyManagerService : ICompanyService
    {
        private readonly ILifetimeScope _container;

        public CompanyManagerService(ILifetimeScope container)
        {
            _container = container;
        }

        public Company Register(CompanyModel company)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICompanyRepository>();
                var record = repository.Get(company.Ticker);
                if (record == null)
                {
                    record = repository.Add(new Company());

                    record.Ticker = company.Ticker;
                    record.Name = company.Name;
                    record.MarketCap = company.MarketCap;
                    record.Sector = company.Sector;
                    record.Industry = company.Industry;
                    record.SummaryUrl = company.SummaryUrl;

                    repository.Commit();
                }

                return record;
            }
        }

        public List<CompanyTradingData> FindCompaniesForUpdate(FindCompaniesForUpdateRequest request)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICompanyRepository>();
                var companies = repository.FindCompanyTradingData(request.FromTimeAgo, request.MaxRecordCount);
                return companies;
            }
        }

        public void UpdateQuotes(string ticker, string jsonQuotes)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<ICompanyRepository>();
                var company = repository.Get(ticker);
                if (company != null)
                {
                    company.HistoryQuotesJson = jsonQuotes;
                    company.LastUpdated = DateTime.UtcNow;
                    repository.Commit();
                }
            }
        }


        public CompanyManager CreateManager(CompanyModel company)
        {
            return new CompanyManager(company, this);
        }

    }
}
