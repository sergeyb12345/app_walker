using dream.walker.data.Entities;
using dream.walker.data.Managers;
using dream.walker.reader.Models;

namespace dream.walker.data.Services
{
    public interface ICompanyService : ICompanyManagerService
    {
        Company Register(CompanyModel company);
    }

    public interface ICompanyManagerService 
    {
        CompanyManager CreateManager(CompanyModel company);

    }
}