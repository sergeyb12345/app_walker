using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader.Models;
using Dream.WebJob.Quotes.Loggers;

namespace Dream.WebJob.Quotes.Jobs
{
    public class CompanyCalculateJob : ICompanyCalculateJob
    {
        private readonly ICompanyService _companyService;

        public CompanyCalculateJob(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        public void Start(ILogger log)
        {
            log.Info("CompanyCalculateJob started");
            try
            {
                var findRequest = new CompaniesToProcessRequest
                {
                    FromTimeAgo = new TimeSpan(1, 0, 0, 0),
                    MaxRecordCount = 10
                };

                var companies = _companyService.FindCompaniesToProcess(findRequest);
                while (companies != null && companies.Any())
                {
                    foreach (var company in companies)
                    {
                        if (company.Quotes.Any())
                        {
                            try
                            {
                                var updateMetricsRequest = new UpdateMetricsRequest()
                                {
                                    Ticker = company.Ticker,
                                    Volume = company.Quotes.Take(10).Average(q=>q.Volume),
                                    Price = company.Quotes.First().Close,
                                    High52 = company.Quotes.Where(q=>q.Date > DateTime.Today.AddYears(-1)).Max(p => p.High),
                                    Low52 = company.Quotes.Where(q=>q.Date > DateTime.Today.AddYears(-1)).Min(p => p.Low),
                                    ChaosPercentage = CalculateChaos(company.Quotes),
                                    CalculatedTime = DateTime.Now
                                };

                                _companyService.UpdateMetrics(updateMetricsRequest);

                                log.Info($"Mertics updated for company {company.Ticker}");

                            }
                            catch (Exception ex)
                            {
                                log.Error($"Failed to UpdateMetrics", ex);
                                _companyService.UpdateMetricsFailed(new UpdateMetricsFailedRequest()
                                {
                                    Ticker = company.Ticker,
                                    CalculatedTime = DateTime.Now,
                                    ErrorMessage = ex.Message
                                });
                            }
                        }

                    }
                    companies = _companyService.FindCompaniesToProcess(findRequest);
                }
            }
            catch (Exception ex)
            {
                log.Error($"Failed to FindCompaniesToProcess", ex);
            }
        }

        private int CalculateChaos(List<QuotesModel> quotes)
        {
            var avgRange = quotes.Take(20).Average(q => q.High - q.Low);
            var maxRange = quotes.Take(20).Max(q => q.High - q.Low);

            var priceRange = new List<decimal>();

            for(int i = 1; i <= 20; i++)
            {
                var p1 = quotes[i-1].Close;
                var p2 = quotes[i].Close;

                priceRange.Add(Math.Abs(p1-p2));
            }

            var avgPriceChange = priceRange.Average(p => p);
            var maxPriceChange = priceRange.Max(p => p);

            if (avgRange > 0 && maxRange > 0)
            {
                var avgChaos = 100 - (avgPriceChange/avgRange)*100;
                var maxChaos = 100 - (maxPriceChange/maxRange)*100;

                return (int) (avgChaos + maxChaos)/2;
            }

            return 0;
        }
    }


    public interface ICompanyCalculateJob : IJob
    {
    }
}
