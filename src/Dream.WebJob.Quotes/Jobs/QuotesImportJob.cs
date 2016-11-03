using System;
using System.Collections.Generic;
using System.Linq;
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
                        if (!company.HistoryQuotes.Any())
                        {
                            company.LastUpdated = DateTime.Today.AddYears(-2);
                        }

                        var historyRequest = new GetStockHistoryRequest(company);

                        List<QuotesModel> quotes = new List<QuotesModel>();
                        var errorMessage = string.Empty;

                        try
                        {
                            var csvQuotes =
                                Task.Run(() => _marketStockClient.GetStockHistory(historyRequest)).Result;
                            quotes = _quotesFileReader.Read(csvQuotes);
                            quotes = quotes.Merge(company.HistoryQuotes);


                        }
                        catch (Exception e)
                        {
                            log.Error($"Failed to read Company quotes: {company.Ticker}", e);
                            errorMessage = e.Message;
                        }

                        try
                        {
                            _companyService.UpdateQuotes(new UpdateQuotesRequest(company.Ticker, quotes)
                            {
                                ErrorMessage = errorMessage
                            });

                            log.Info($"Company quotes updated successfully: {company.Ticker}");

                        }
                        catch (Exception ex)
                        {
                            log.Error($"Failed to update Company: {company.Ticker}", ex);
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
