using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;
using dream.walker.station.Publishers;
using dream.walker.stock;
using dream.walker.stock.Requests;
using Newtonsoft.Json;

namespace dream.walker.station.Processors.QuotesImport
{
    public class QuotesImportProcess : IProcess
    {
        private readonly IMarketStockClient _marketStockClient;
        private readonly ICompanyService _companyService;
        private readonly IQuotesFileReader _quotesFileReader;
        private readonly IPublisher _publisher;

        public QuotesImportProcess(IMarketStockClient  marketStockClient, 
            ICompanyService companyService,
            IQuotesFileReader quotesFileReader,
            IPublisher publisher)
        {
            _marketStockClient = marketStockClient;
            _companyService = companyService;
            _quotesFileReader = quotesFileReader;
            _publisher = publisher;
        }

        public void Start(CancellationToken token)
        {
            Task.Run(() =>
            {
                using (var waitHandle = token.WaitHandle)
                {
                    var interval = new TimeSpan(0, 5, 0); //5 min
                    do
                    {
                        

                        try
                        {
                            var findRequest = new FindCompaniesForUpdateRequest
                            {
                                FromTimeAgo = new TimeSpan(1, 0, 0, 0),
                                MaxRecordCount = 10
                            };

                            var companies = _companyService.FindCompaniesForUpdate(findRequest);
                            while (companies != null && companies.Any())
                            {
                                foreach (var company in companies)
                                {
                                    var folder = @"C:\Development\app_walker\data";
                                    var path = Path.Combine(folder, $"companyQuotes-{company.Ticker}.csv");
                                    if (File.Exists(path))
                                    {
                                        File.Delete(path);
                                    }

                                    var historyRequest = new GetStockHistoryRequest(company);

                                    List<QuotesModel> quotes = new List<QuotesModel>();

                                    try
                                    {
                                        var csvQuotes = Task.Run(() => _marketStockClient.GetStockHistory(historyRequest), token).Result;
                                        quotes = _quotesFileReader.Read(csvQuotes);

                                        _companyService.UpdateQuotes(company.Ticker, JsonConvert.SerializeObject(quotes));

                                        _publisher.Publish($"Updated Company {company.Ticker}");
                                    }
                                    catch (Exception e)
                                    {
                                        _publisher.Publish($"Failed to update Company: {company.Ticker}. {e.Message}");
                                    }

                                    _companyService.UpdateQuotes(company.Ticker, JsonConvert.SerializeObject(quotes));
                                }
                                companies = _companyService.FindCompaniesForUpdate(findRequest);
                            }
                        }
                        catch (Exception ex)
                        {

                        }
                    } while (!waitHandle.WaitOne(interval));
                }
            }, token);

        }
    }
}
