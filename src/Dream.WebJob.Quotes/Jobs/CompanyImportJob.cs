using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;
using Dream.WebJob.Quotes.Loggers;

namespace Dream.WebJob.Quotes.Jobs
{
    public class CompanyImportJob: ICompanyImportJob
    {
        public void Start(ILogger log)
        {
            string folder = @"C:\justeat\sergey-balaboskin\app_walker\data";
            var path = Path.Combine(folder, "NYSE.csv");
            if (File.Exists(path))
            {
                var list = _fileReader.Read(path);
                if (list != null)
                {
                    Import(list, log);
                }
            }
        }

        private readonly ICompanyManagerService _companyService;
        private readonly ICompanyFileReader _fileReader;

        public CompanyImportJob(ICompanyManagerService companyService, ICompanyFileReader fileReader)
        {
            _companyService = companyService;
            _fileReader = fileReader;
        }


        private void Import(List<CompanyModel> companies, ILogger log)
        {
            foreach (var company in companies)
            {
                if (company.IsActive == 1)
                {
                    var manager = _companyService.CreateManager(company);
                    manager.Import();
                    log.Info($"Company Imported {company.Ticker}");
                }
            }
        }

    }

    public interface ICompanyImportJob : IJob
    {
    }
}
