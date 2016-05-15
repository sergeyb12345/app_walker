using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;
using dream.walker.data.Models;

namespace dream.walker.data.Repositories
{
    public interface ICompanyRepository : IDreamDbRepository<Company>
    {
        Company Get(string ticker);
        List<CompanyTradingData> FindCompanyTradingData(TimeSpan fromTimeAgo, int count);
    }


    public class CompanyRepository : DreamDbRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Company Get(string ticker)
        {
            var record = Dbset.FirstOrDefault(r => r.Ticker == ticker);
            return record;
        }

        public List<CompanyTradingData> FindCompanyTradingData(TimeSpan fromTimeAgo, int count)
        {
            var fromDate = DateTime.Now.Subtract(fromTimeAgo).Date;
            var records = Dbset.Select(c => 
                new CompanyTradingData
                {
                    Ticker = c.Ticker,
                    LastUpdated = c.LastUpdated
                })
                .Where(c => c.LastUpdated < fromDate)
                .OrderBy(c => c.Ticker)
                .Take(count)
                .ToList();

            return records;
        }
    }
}
