using System;

namespace Dream.WebJob.Quotes.Loggers
{
    public class ConsoleLogger : ILogger
    {

        public void Info(string message)
        {
            Console.WriteLine($"INFO [{DateTime.UtcNow.ToString("g")}]: {message}");
        }

        public void Error(string message, Exception ex)
        {
            Console.WriteLine($"ERROR [{DateTime.UtcNow.ToString("g")}]: {message} {Environment.NewLine}{ex.ToString()}");
        }
    }
}