using System;
using System.Collections.Generic;
using dream.walker.data.Entities;
using dream.walker.data.Models;

namespace dream.walker.data.Repositories
{
    public interface ICompanyRepository : IDreamDbRepository<Company>
    {
        Company Get(string ticker);
        List<CompanyTradingData> FindCompanyTradingData(TimeSpan fromTimeAgo, int count);
    }
}