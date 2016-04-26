using System;
using System.Linq;
using dream.walker.data.Entities;
using dream.walker.data.Managers;

namespace dream.walker.data.Repositories
{
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

    }
}
