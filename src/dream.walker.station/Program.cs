using System;
using System.Collections.Generic;
using System.Threading;
using Autofac;
using dream.walker.station.IoC;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Files;

namespace dream.walker.station
{
    // To learn more about Microsoft Azure WebJobs SDK, please see http://go.microsoft.com/fwlink/?LinkID=320976
    class Program
    {
        public static void Main(string[] args)
        {
            var container = IoCContainer.Instance;
            var processes = container.Resolve<IEnumerable<IProcess>>();
            var tokenSource = new CancellationTokenSource();

            foreach (var process in processes)
            {
                process.Start(tokenSource.Token);
            }
        }

        // Please set the following connection strings in app.config for this WebJob to run:
        // AzureWebJobsDashboard and AzureWebJobsStorage
        private void Start()
        {
            JobHostConfiguration config = new JobHostConfiguration();
            FilesConfiguration filesConfig = new FilesConfiguration();
            // When running locally, set this to a valid directory. 
            // Remove this when running in Azure.
            // filesConfig.RootPath = @"c:\temp\files";

            // Add Triggers and Binders for Files and Timer Trigger.
            config.UseFiles(filesConfig);
            config.UseTimers();
            JobHost host = new JobHost(config);
            host.RunAndBlock();
        }
    }
}
