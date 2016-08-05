using System.Threading;
using Autofac;
using Dream.WebJob.Quotes.Jobs;
using Dream.WebJob.Quotes.Loggers;

namespace dream.walker.station
{
    // To learn more about Microsoft Azure WebJobs SDK, please see http://go.microsoft.com/fwlink/?LinkID=320976
    class Program
    {
        public static void Main(string[] args)
        {
            var job = Dream.WebJob.Quotes.IoC.IoCContainer.Instance.Resolve<IQuotesImportJob>();
            var tokenSource = new CancellationTokenSource();

            job.Start(tokenSource.Token, new ConsoleLogger());
        }

    }
}
