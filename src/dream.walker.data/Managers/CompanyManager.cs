using dream.walker.data.Services;
using dream.walker.reader.Models;

namespace dream.walker.data.Managers
{
    public class CompanyManager
    {
        private readonly CompanyModel _company;
        private readonly ICompanyService _service;

        internal CompanyManager(CompanyModel company, ICompanyService service)
        {
            _company = company;
            _service = service;
        }

        public void Import()
        {
            _service.Register(_company);
        }
    }
}