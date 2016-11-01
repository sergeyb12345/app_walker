using System.Threading;
using Autofac;
using dream.walker.data;
using Dream.WebJob.Quotes.Jobs;
using Dream.WebJob.Quotes.Loggers;

namespace dream.walker.station
{
    // To learn more about Microsoft Azure WebJobs SDK, please see http://go.microsoft.com/fwlink/?LinkID=320976
    class Program
    {
        public static void Main(string[] args)
        {
            MsSqlDbMigrator.UpgradeDatabase();

            var job = Dream.WebJob.Quotes.IoC.IoCContainer.Instance.Resolve<IQuotesImportJob>();
            //var job = Dream.WebJob.Quotes.IoC.IoCContainer.Instance.Resolve<ICompanyImportJob>();
            job.Start(new ConsoleLogger());
        }

    }
}
