using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Extensions;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;
using dream.walker.stock;
using dream.walker.stock.Requests;
using Newtonsoft.Json;

namespace Dream.WebJob.Quotes.Jobs
{
    public class QuotesImportJob : IQuotesImportJob
    {
        private readonly IMarketStockClient _marketStockClient;
        private readonly ICompanyService _companyService;
        private readonly IQuotesFileReader _quotesFileReader;

        public QuotesImportJob(IMarketStockClient  marketStockClient, 
            ICompanyService companyService,
            IQuotesFileReader quotesFileReader)
        {
            _marketStockClient = marketStockClient;
            _companyService = companyService;
            _quotesFileReader = quotesFileReader;
        }

        public void Start(CancellationToken token, TextWriter log)
        {
            Task.Run(() =>
            {
                log.WriteLine("QuotesImportJob started");

                using (var waitHandle = token.WaitHandle)
                {
                    var interval = new TimeSpan(0, 1, 0); //5 min
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
                                    var historyRequest = new GetStockHistoryRequest(company);

                                    List<QuotesModel> quotes = new List<QuotesModel>();

                                    try
                                    {
                                        var csvQuotes = Task.Run(() => _marketStockClient.GetStockHistory(historyRequest), token).Result;
                                        quotes = _quotesFileReader.Read(csvQuotes);
                                        quotes = quotes.Merge(company.HistoryQuotes);
                                    }
                                    catch (Exception e)
                                    {
                                        log.WriteLine($"Failed to update Company: {company.Ticker}. {e.ToString()}");
                                    }

                                    _companyService.UpdateQuotes(company.Ticker, JsonConvert.SerializeObject(quotes));
                                }
                                companies = _companyService.FindCompaniesForUpdate(findRequest);
                            }
                        }
                        catch (Exception ex)
                        {
                            log.WriteLine($"Failed to FindCompaniesForUpdate. {ex.ToString()}");
                        }
                    } while (!waitHandle.WaitOne(interval));
                }

                log.WriteLine("QuotesImportJob finished");

            }, token);

        }
    }
}
