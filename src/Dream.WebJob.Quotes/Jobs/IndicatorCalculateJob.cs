using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Extensions;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Models;
using dream.walker.stock;
using dream.walker.stock.Requests;
using Dream.WebJob.Quotes.Loggers;
using Newtonsoft.Json;

namespace Dream.WebJob.Quotes.Jobs
{
    public class IndicatorCalculateJob : IIndicatorCalculateJob
    {
        private readonly IMarketStockClient _marketStockClient;
        private readonly ICompanyService _companyService;
        private readonly IQuotesFileReader _quotesFileReader;

        public IndicatorCalculateJob(IMarketStockClient  marketStockClient, 
            ICompanyService companyService,
            IQuotesFileReader quotesFileReader)
        {
            _marketStockClient = marketStockClient;
            _companyService = companyService;
            _quotesFileReader = quotesFileReader;
        }


        public void Start(ILogger log)
        {
            log.Info("QuotesImportJob started");
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
                            var csvQuotes =
                                Task.Run(() => _marketStockClient.GetStockHistory(historyRequest)).Result;
                            quotes = _quotesFileReader.Read(csvQuotes);
                            quotes = quotes.Merge(company.HistoryQuotes);


                        }
                        catch (Exception e)
                        {
                            log.Error($"Failed to update Company: {company.Ticker}", e);
                        }

                        _companyService.UpdateQuotes(company.Ticker, JsonConvert.SerializeObject(quotes));
                        if (quotes.Any())
                        {
                            log.Info($"Company quotes updated successfully: {company.Ticker}");
                        }

                    }
                    companies = _companyService.FindCompaniesForUpdate(findRequest);
                }
            }
            catch (Exception ex)
            {
                log.Error($"Failed to FindCompaniesForUpdate", ex);
            }

        }
    }
}
