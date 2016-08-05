using System;
using System.IO;

namespace Dream.WebJob.Quotes.Loggers
{
    public class TextWriterLogger : ILogger
    {
        private readonly TextWriter _logger;

        public TextWriterLogger(TextWriter logger)
        {
            _logger = logger;
        }

        public void Info(string message)
        {
            _logger.WriteLine($"INFO [{DateTime.UtcNow.ToString("g")}]: {message}");
        }

        public void Error(string message, Exception ex)
        {
            _logger.WriteLine($"ERROR [{DateTime.UtcNow.ToString("g")}]: {message} {Environment.NewLine}{ex.ToString()}");
        }
    }
}