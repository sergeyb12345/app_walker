using System.Collections.Generic;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Models;

namespace dream.walker.data.Repositories
{
    public interface ICompanyIndicatorRepository
    {
        List<CompanyToProcess> FindCompaniesToProcess(int maxCompanyCount);
        List<CompanyIndicator> Get(string ticker);
        CompanyIndicator Add(CompanyIndicator companyIndicator);
        CompanyIndicator Get(string ticker, int indicatorId);
        void Commit();
    }
}