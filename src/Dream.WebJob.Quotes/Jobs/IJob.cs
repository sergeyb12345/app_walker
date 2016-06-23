using System.IO;
using System.Threading;

namespace Dream.WebJob.Quotes.Jobs
{
    public interface IJob
    {
        void Start(CancellationToken token, TextWriter log);
    }
}