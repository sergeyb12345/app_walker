using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;

namespace dream.walker.station
{
    public class Functions
    {
        // This function will get triggered/executed when a new message is written 
        // on an Azure Queue called queue.
        public static void ProcessQueueMessage([QueueTrigger("queue")] string message, TextWriter log)
        {
            log.WriteLine(message);
        }

        // Function triggered by a timespan schedule every 15 sec.
        public static void TimerJob([TimerTrigger("00:30:00")] TimerInfo timerInfo, TextWriter log)
        {
            log.WriteLine("Scheduled job fired!");
        }

        // When new files arrive in the "import" directory, 
        // they are uploaded to a blob container.
        //public static void ImportFile([FileTrigger(@"import\{name}", "*.txt")] TextReader input, [Blob(@"processed/{name}")] TextWriter output, string name, TextWriter log)
        //{
        //    output.Write(input.ReadToEnd());
        //    log.WriteLine(string.Format("Processed input file '{0}'!", name));
        //}

        public static void WriteLog([BlobTrigger("input/{name}")] string logMessage,
        string name,
        TextWriter logger)
        {
            logger.WriteLine("Blob name: {0}", name);
            logger.WriteLine("Content:");
            logger.WriteLine(logMessage);
        }

        public static void LogPoisonBlob(
            [QueueTrigger("webjobs-blobtrigger-poison")] PoisonBlobMessage message,
            TextWriter logger)
        {
            logger.WriteLine("FunctionId: {0}", message.FunctionId);
            logger.WriteLine("BlobType: {0}", message.BlobType);
            logger.WriteLine("ContainerName: {0}", message.ContainerName);
            logger.WriteLine("BlobName: {0}", message.BlobName);
            logger.WriteLine("ETag: {0}", message.ETag);
        }

    }

    public class PoisonBlobMessage
    {
        public string FunctionId { get; set; }
        public string BlobType { get; set; }
        public string ContainerName { get; set; }
        public string BlobName { get; set; }
        public string ETag { get; set; }
    }

}
