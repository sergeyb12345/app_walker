using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Extensions;
using dream.walker.data.Models;
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
        private readonly IIndicatorProcessor _indicatorProcessor;

        public QuotesImportJob(IMarketStockClient  marketStockClient, 
            ICompanyService companyService,
            IQuotesFileReader quotesFileReader,
            IIndicatorProcessor indicatorProcessor)
        {
            _marketStockClient = marketStockClient;
            _companyService = companyService;
            _quotesFileReader = quotesFileReader;
            _indicatorProcessor = indicatorProcessor;
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
                        var quotes = UpdateQuotes(log, company);
                        if (quotes != null)
                        {
                            try
                            {
                                _indicatorProcessor.Process(company.Ticker, quotes);
                            }
                            catch (Exception ex)
                            {
                                log.Error($"Failed to calculate indicators for company {company.Ticker}. {ex.Message}", ex);
                            }
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

        private List<QuotesModel> UpdateQuotes(ILogger log, CompanyToUpdate company)
        {
            if (!company.HistoryQuotes.Any())
            {
                company.LastUpdated = DateTime.Today.AddYears(-1);
            }

            var historyRequest = new GetStockHistoryRequest(company.Ticker, company.LastUpdated);

            var quotes = new List<QuotesModel>();
            var errorMessage = string.Empty;

            try
            {
                var csvQuotes =
                    Task.Run(() => _marketStockClient.GetStockHistory(historyRequest)).Result;
                quotes = _quotesFileReader.Read(csvQuotes);
                quotes = quotes.Merge(company.HistoryQuotes).Where(q => q.Date > DateTime.Today.AddYears(-1)).ToList();


            }
            catch (AggregateException ex)
            {
                log.Error($"Failed to read Company quotes: {company.Ticker}", ex);
                foreach (var exception in ex.InnerExceptions)
                {
                    errorMessage += exception.Message + " ";

                }
            }
            catch (Exception ex)
            {
                log.Error($"Failed to read Company quotes: {company.Ticker}", ex);
                errorMessage = ex.Message;
            }

            try
            {
                _companyService.UpdateQuotes(new UpdateQuotesRequest(company.Ticker, quotes)
                {
                    ErrorMessage = errorMessage
                });

                if (string.IsNullOrEmpty(errorMessage))
                {
                    log.Info($"Company quotes updated successfully: {company.Ticker}");
                }
                else
                {
                    log.Error($"Failed to update Company: {company.Ticker}", new Exception(errorMessage));
                }

            }
            catch (Exception ex)
            {
                errorMessage = $"Failed to update Company: {company.Ticker}";
                log.Error(errorMessage, ex);
            }

            if (string.IsNullOrWhiteSpace(errorMessage))
            {
                return quotes;
            }

            return null;
        }
    }
}
