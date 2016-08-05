using System.IO;
using System.Threading;
using Dream.WebJob.Quotes.Loggers;

namespace Dream.WebJob.Quotes.Jobs
{
    public interface IJob
    {
        void Start(ILogger log);
    }

    public interface IQuotesImportJob : IJob
    {
    }

    public interface IIndicatorCalculateJob : IJob
    {
    }
}