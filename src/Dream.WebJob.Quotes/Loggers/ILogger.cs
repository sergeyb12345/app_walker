using System;

namespace Dream.WebJob.Quotes.Loggers
{
    public interface ILogger
    {
        void Info(string message);
        void Error(string message, Exception ex);
    }
}