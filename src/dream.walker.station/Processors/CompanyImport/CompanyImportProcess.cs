using System.Collections.Generic;
using System.IO;
using System.Threading;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;

namespace dream.walker.station.Processors.CompanyImport
{
    //http://www.csidata.com/factsheets.php?type=stock&format=html&exchangeid=88

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
            string folder = @"C:\justeat\sergey-balaboskin\app_walker\data";
            var path = Path.Combine(folder, "NASDAQ.csv");
            if (File.Exists(path))
            {
                var list = _fileReader.Read(path);
                if (list != null)
                {
                    Import(list);
                }
            }
        }

        private void Import(List<CompanyModel> companies)
        {
            foreach (var company in companies)
            {
                if (company.IsActive == 1)
                {
                    var manager = _companyService.CreateManager(company);
                    manager.Import();
                }
            }
        }
    }
}
