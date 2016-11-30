using System.Web.Http;
using Autofac.Integration.WebApi;
using dream.walker.space.Filters;
using dream.walker.space.IoC;
using Newtonsoft.Json;
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
}
