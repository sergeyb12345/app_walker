using System.Collections.Generic;
using System.IO;
using System.Threading;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;

namespace dream.walker.station.CompanyImport
{
    public class CompanyImportProcess : IProcess
    {
        private readonly ICompanyManagerService _companyService;
        private readonly ICompanyFileReader _fileReader;

        public CompanyImportProcess(ICompanyManagerService companyService, ICompanyFileReader fileReader)
        {
            _companyService = companyService;
            _fileReader = fileReader;
        }


        public void Start(CancellationToken token)
        {
            string folder = @"C:\Work\sergey-balaboskin\asp.net_4\app_walker\src\dream.walker.reader";
            var path = Path.Combine(folder, "companylist.csv");

            var list = _fileReader.Read(path);
            if (list != null)
            {
                Import(list);
            }
        }

        private void Import(List<CompanyModel> companies)
        {
            foreach (var company in companies)
            {
                var manager = _companyService.CreateManager(company);
                manager.Import();
            }
        }
    }
}
