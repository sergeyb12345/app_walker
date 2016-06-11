using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using dream.walker.data.Entities;
using dream.walker.data.Services;
using Newtonsoft.Json;

namespace dream.walker.station.Processors.IndicatorProcessor
{
    public class IndicatorProcess : IProcess
    {
        private readonly ICompanyService _companyService;
        private readonly ICompanyIndicatorService _companyIndicatorService;
        private readonly IndicatorProcessorFactory _processorFactory;

        public IndicatorProcess(ICompanyService companyService, ICompanyIndicatorService companyIndicatorService,
            IndicatorProcessorFactory processorFactory)
        {
            _companyService = companyService;
            _companyIndicatorService = companyIndicatorService;
            _processorFactory = processorFactory;
        }


        public void Start(CancellationToken token)
        {
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
            var companies = _companyIndicatorService.FindCompaniesToProcess(100);
            foreach (var company in companies)
            {
                var processors = new List<IIndicatorProcessor>();
                List<Indicator> indicators = _companyIndicatorService.GetRegisteredIndicators();

                foreach (var indicator in indicators)
                {
                    var processor = _processorFactory.Create(indicator);
                    var data = processor.Calculate(indicator, company.Quotes);
                    if (data != null && data.Any())
                    {
                        _companyIndicatorService.Update(company.Ticker, JsonConvert.SerializeObject(data), indicator);
                    }
                }
            }
        }

    }
}