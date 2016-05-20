using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader.Models;
using dream.walker.strategy;

namespace dream.walker.station.Processors.StrategyMonitor
{
    public class StrategyMonitorProcess : IProcess
    {
        private readonly ILifetimeScope _container;
        private readonly ICompanyService _companyService;

        public StrategyMonitorProcess(ILifetimeScope container, ICompanyService companyService)
        {
            _container = container;
            _companyService = companyService;
        }

        public void Start(CancellationToken token)
        {
            Task.Run(() =>
            {
                using (var waitHandle = token.WaitHandle)
                {
                    var interval = new TimeSpan(0, 5, 0); //5 min
                    do
                    {
                        try
                        {
                            Execute();
                        }
                        catch (Exception ex)
                        {
                            //
                        }
                    } while (!waitHandle.WaitOne(interval));
                }
            });
        }

        private void Execute()
        {
            var strategies = _container.Resolve<IEnumerable<ITradeStrategy>>();
            var companies = _companyService.FindCompaniesToProcess(
                new CompaniesToProcessRequest {FromTimeAgo = new TimeSpan(1, 0, 0, 0), MaxRecordCount = 100});
            
            foreach (var strategy in strategies)
            {
                strategy.Validate(companies);
            }
        }
    }
}
