using System.IO;
using System.Threading;
using Autofac;
using Dream.WebJob.Quotes.Jobs;
using Dream.WebJob.Quotes.Schedules;
using Microsoft.Azure.WebJobs;

namespace Dream.WebJob.Quotes
{
    public class Functions
    {
        #region Commented ScheduledJobs
        /*
        // This function will get triggered/executed when a new message is written 
        // on an Azure Queue called queue.
        public static void ProcessQueueMessage([QueueTrigger("queue")] string message, TextWriter log)
        {
            log.WriteLine(message);
        }

        public static void TimerJob([TimerTrigger("00:00:10")] TimerInfo timerInfo, TextWriter log)
        {
            log.WriteLine("TimerJob fired!");
        }

        public static void WriteLog([BlobTrigger("input/{name}")] string logMessage, string name, TextWriter logger)
        {
            logger.WriteLine("Blob name: {0}", name);
            logger.WriteLine("Content:");
            logger.WriteLine(logMessage);
        }

        public static void IndicatorCalculateTimerJob([TimerTrigger(typeof(IndicatorCalculateSchedule))] TimerInfo timerInfo, TextWriter log)
        {
            log.WriteLine("IndicatorCalculateTimerJob fired!");
        }
        */
        #endregion

        public static void QuotesUpdateTimerJob([TimerTrigger(typeof(QuotesUpdateSchedule))] TimerInfo timerInfo, TextWriter log)
        {
            var job = IoC.IoCContainer.Instance.Resolve<IQuotesImportJob>();
            var tokenSource = new CancellationTokenSource();

            job.Start(tokenSource.Token, log);
        }

    }
}
