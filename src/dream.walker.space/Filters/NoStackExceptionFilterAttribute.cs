using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using Newtonsoft.Json;

namespace dream.walker.space.Filters
{
    public class NoStackExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {

            if (context.Exception is NotImplementedException)
            {
                context.Response = new HttpResponseMessage(HttpStatusCode.NotImplemented);
                return;
            }

            var exception = context.Exception;
            var message = new StringBuilder();
            var source = new StringBuilder(context.Request.RequestUri.PathAndQuery);

            source.Append($" => {exception.Source}");
            message.AppendLine($"{exception.Message}. ");

            while (exception.InnerException != null)
            {
                message.AppendLine($"{exception.InnerException.Message}. ");
                source.Append($" => {exception.InnerException.Source}");

                exception = exception.InnerException;
            }
            var error = new
            {
                Source = source.ToString(),
                Message = message.ToString()
            };

            context.Response = new HttpResponseMessage
            {
                Content = new StringContent( JsonConvert.SerializeObject(error), Encoding.UTF8, "application/json"),
                StatusCode = System.Net.HttpStatusCode.InternalServerError
            };
        }

        public override Task OnExceptionAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            return base.OnExceptionAsync(actionExecutedContext, cancellationToken);
        }
    }
}