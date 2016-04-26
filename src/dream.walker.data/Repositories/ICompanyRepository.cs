using dream.walker.data.Entities;
using dream.walker.data.Managers;

namespace dream.walker.data.Repositories
{
    public interface ICompanyRepository : IDreamDbRepository<Company>
    {
        Company Get(string ticker);
    }
}