using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities;
using dream.walker.data.Models;

namespace dream.walker.data.Repositories
{
    public class CompanyIndicatorRepository : DreamDbRepository<CompanyIndicator>, ICompanyIndicatorRepository
    {
        public CompanyIndicatorRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public List<CompanyToProcess> FindCompaniesToProcess(int maxCompanyCount)
        {
            /*
            SELECT DISTINCT C.Ticker, C.HistoryQuotesJson
            FROM dbo.CompanyIndicator CI 
	            INNER JOIN dbo.Company C ON CI.Ticker = C.Ticker
            WHERE CI.LastUpdated < C.LastUpdated
            */

            throw new System.NotImplementedException();
        }

        public List<CompanyIndicator> Get(string ticker)
        {
            var records = Dbset
                .Where(c => c.Ticker == ticker)
                .ToList();

            return records;
        }
    }
}