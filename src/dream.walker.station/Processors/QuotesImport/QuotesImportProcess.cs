using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.stock;
using dream.walker.stock.Enums;
using dream.walker.stock.Requests;

namespace dream.walker.station.Processors.QuotesImport
{
    public class QuotesImportProcess : IProcess
    {
        private readonly IMarketStockClient _marketStockClient;
        private readonly ICompanyService _companyService;

        public QuotesImportProcess(IMarketStockClient  marketStockClient, ICompanyService companyService)
        {
            _marketStockClient = marketStockClient;
            _companyService = companyService;
        }

        public void Start(CancellationToken token)
        {
            var findRequest = new FindCompaniesForUpdateRequest();

            var companies = _companyService.FindCompaniesForUpdate(findRequest);
            if (companies != null)
            {
                foreach (var company in companies)
                {
                    var folder = @"C:\Development\app_walker\data";
                    var path = Path.Combine(folder, $"companyQuotes-{company.Ticker}.csv");
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                    }

                    var historyRequest = new GetStockHistoryRequest
                    {
                        Symbol    = company.Ticker,
                        TimeFrame = QuoteTimeFrame.Year,
                        TimeFrameValue = 1
                    };

                    var csvQuotes = Task.Run(() => _marketStockClient.GetStockHistory(historyRequest), token).Result;

                    using (var textFile = File.CreateText(path))
                    {
                        textFile.Write(csvQuotes);
                    }
                    return;
                }
            }
        }
    }
}
