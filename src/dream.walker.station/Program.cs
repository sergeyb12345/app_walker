using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Files;

namespace dream.walker.station
{
    // To learn more about Microsoft Azure WebJobs SDK, please see http://go.microsoft.com/fwlink/?LinkID=320976
    class Program
    {
        // Please set the following connection strings in app.config for this WebJob to run:
        // AzureWebJobsDashboard and AzureWebJobsStorage
        static void Main()
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
