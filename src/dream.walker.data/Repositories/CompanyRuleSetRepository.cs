using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities.Companies;


namespace dream.walker.data.Repositories
{
    public interface ICompanyRuleSetRepository
    {
        Task<List<CompanyRuleSet>> GetAllAsync(string ticker);
        CompanyRuleSet Add(CompanyRuleSet rule);
        Task<CompanyRuleSet> GetAsync(string ticker, int ruleSetId);
        Task CommitAsync();
    }


    public class CompanyRuleSetRepository : DreamDbRepository<CompanyRuleSet>, ICompanyRuleSetRepository
    {
        public CompanyRuleSetRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }


        public async Task<List<CompanyRuleSet>> GetAllAsync(string ticker)
        {
            var records = await Dbset.Where(r => r.Ticker.ToUpper() == ticker.ToUpper()).ToListAsync();
            return records;
        }

        public async Task<CompanyRuleSet> GetAsync(string ticker, int ruleSetId)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.Ticker.ToUpper() == ticker.ToUpper() && r.RuleSetId == ruleSetId);
            return record;
        }
    }
}