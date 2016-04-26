using dream.walker.data.Entities;

namespace dream.walker.data.Repositories
{
    public class CompanyRepository : DreamDbRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }
    }
}
