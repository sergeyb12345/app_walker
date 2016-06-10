using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;
using dream.walker.stock.Requests;
using Newtonsoft.Json;

namespace dream.walker.station.Processors.CompanyImport
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
            string folder = @"C:\Development\app_walker\data";
            var path = Path.Combine(folder, "companylist_.csv");
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
                var manager = _companyService.CreateManager(company);
                manager.Import(); 
            }
        }
    }
}
