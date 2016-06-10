using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Entities;
using dream.walker.data.Models;
using dream.walker.data.Services;
using dream.walker.reader.Models;

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
                    string jsonData = processor.Process(company.Quotes);
                    if (!string.IsNullOrEmpty(jsonData))
                    {
                        _companyIndicatorService.Update(company.Ticker, jsonData, indicator);
                    }
                }
            }
        }

    }

    public class IndicatorProcessorFactory
    {
        private readonly ILifetimeScope _container;

        public IndicatorProcessorFactory(ILifetimeScope container)
        {
            _container = container;
        }

        public IIndicatorProcessor Create(Indicator indicator)
        {
            throw new NotImplementedException();
        }
    }

    public interface IIndicatorProcessor
    {
        string Process(List<QuotesModel> quotes);
    }

    public class IndicatorProcessManager
    {
        public IndicatorProcessManager(CompanyToProcess company, Indicator indicator)
        {
            throw new NotImplementedException();
        }

        public string Process()
        {
            throw new NotImplementedException();
        }
    }

    public interface ICompanyIndicatorService
    {
        List<CompanyToProcess> FindCompaniesToProcess(int maxCompanyCount);
        List<Indicator> GetRegisteredIndicators();
        void Update(string ticker, string jsonData, Indicator indicator);
    }
}