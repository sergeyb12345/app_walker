using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Entities;
using dream.walker.data.Models;
using dream.walker.data.Services;
using Newtonsoft.Json;

namespace dream.walker.calculators.IndicatorProcessor
{
    public class IndicatorProcess 
    {
        private readonly ICompanyIndicatorService _companyIndicatorService;
        private readonly ICompanyService _companyService;
        private readonly IndicatorProcessorFactory _processorFactory;

        public IndicatorProcess(ICompanyIndicatorService companyIndicatorService,
            ICompanyService companyService,
            IndicatorProcessorFactory processorFactory)
        {
            _companyIndicatorService = companyIndicatorService;
            _companyService = companyService;
            _processorFactory = processorFactory;
        }


        public void Start(CancellationToken token)
        {

            Process();
            return;
            
            Task.Run(() =>
            {
                using (var waitHandle = token.WaitHandle)
                {
                    var interval = new TimeSpan(1, 0, 0); //1 hr
                    do
                    {
                        try
                        {
                            Process();
                        }
                        catch (Exception ex)
                        {

                        }
                    } while (!waitHandle.WaitOne(interval));
                }
            }, token);
        }


        public void Process()
        {
            var indicators = _companyIndicatorService.GetRegisteredIndicators();
            if (!indicators.Any())
            {
                indicators = _companyIndicatorService.RegisterCommonIndicators();
            }

            var companies = _companyIndicatorService.FindCompaniesToProcess(10);
            foreach (var company in companies)
            {
                var companyIndicators = _companyIndicatorService.GetIndicators(company.Ticker);

                foreach (var indicator in indicators)
                {
                    if (NeedToCalculate(indicator, companyIndicators, company))
                    {
                        var processor = _processorFactory.Create(indicator);
                        var data = processor?.Calculate(indicator, company.Quotes);

                        if (data != null && data.Any())
                        {
                            _companyIndicatorService.Update(company.Ticker, JsonConvert.SerializeObject(data), indicator);
                        }
                    }
                }
                _companyService.SetLastCalculated(company.Ticker);
            }
        }

        private bool NeedToCalculate(Indicator indicator, List<CompanyIndicator> companyIndicators, CompanyToProcess company)
        {
            var companyIndicator = companyIndicators.Where(c => c.IndicatorId == indicator.IndicatorId).ToList();

            if (!companyIndicator.Any())
            {
                return true;
            }

            if (companyIndicator.All(c => c.LastUpdated < company.LastUpdated))
            {
                return true;
            }

            return false;
        }
    }
}