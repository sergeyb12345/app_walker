using System;
using System.Linq;
using dream.walker.data.Requests;
using dream.walker.data.Services;
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
                            //do here
                            var updateMetricsRequest = new UpdateMetricsRequest();
                            _companyService.UpdateMetrics(updateMetricsRequest);
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
    }


    public interface ICompanyCalculateJob : IJob
    {
    }
}
