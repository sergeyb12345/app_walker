using System;
using System.Configuration;
using Dream.WebJob.Quotes.Loggers;
using RestSharp;

namespace Dream.WebJob.Quotes.Jobs
{
    public class HealthCheckJob : IHealthCheckJob
    {
        public void Start(ILogger log)
        {
            try
            {
                var baseUrl = ConfigurationManager.AppSettings["DreamWalkerSpaceBaseUrl"];
                if (!string.IsNullOrWhiteSpace(baseUrl))
                {
                    var client = new RestClient(baseUrl);
                    var request = new RestRequest("health/check", Method.GET);
                    IRestResponse response = client.Execute(request);
                    log.Info($"Health check status: {(int)response.StatusCode} - {response.StatusCode}"); 
                }
            }
            catch (Exception ex)
            {
                log.Error($"Failed to execute health check", ex);
            }
        }
    }
}