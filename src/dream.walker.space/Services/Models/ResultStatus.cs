using System.Net;

namespace dream.walker.space.Services.Models
{
    public class ResultStatus
    {
        public string Message { get; set; }
        public StatusCode StatusCode { get; set; }
    }

    public enum StatusCode
    {
        Ok,
        Warn,
        Error
    }
}