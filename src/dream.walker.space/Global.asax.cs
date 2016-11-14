using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using dream.walker.space.IoC;

namespace dream.walker.space
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            IoCContainer.Instance.Register();
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
