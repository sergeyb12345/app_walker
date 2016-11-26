using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;
using Autofac.Integration.WebApi;
using dream.walker.space.IoC;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace dream.walker.space
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(IoCContainer.Instance.Container);
            config.Filters.Add(new NoStackExceptionFilterAttribute());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var settings = config.Formatters.JsonFormatter.SerializerSettings;
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }

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
