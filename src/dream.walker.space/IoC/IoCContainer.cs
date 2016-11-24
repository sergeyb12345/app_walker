using System.Reflection;
using Autofac;
using Autofac.Integration.Mvc;
using dream.walker.data;
using dream.walker.data.Repositories;
using System.Web.Mvc;
using Autofac.Integration.WebApi;
using dream.walker.data.Services;

namespace dream.walker.space.IoC
{
    public class IoCContainer
    {
        private static IoCContainer _instance;
        private IContainer _container;

        public void Register()
        {
            var builder = new ContainerBuilder();

            // Register your MVC controllers. (MvcApplication is the name of
            // the class in Global.asax.)
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterApiControllers(typeof(MvcApplication).Assembly);

            // OPTIONAL: Register model binders that require DI.
            builder.RegisterModelBinders(typeof(MvcApplication).Assembly);
            builder.RegisterModelBinderProvider();

            // OPTIONAL: Register web abstractions like HttpContextBase.
            builder.RegisterModule<AutofacWebTypesModule>();

            // OPTIONAL: Enable property injection in view pages.
            builder.RegisterSource(new ViewRegistrationSource());

            // OPTIONAL: Enable property injection into action filters.
            builder.RegisterFilterProvider();

            RegisterServices(builder);

            // Set the dependency resolver to be Autofac.
            _container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(_container));
        }


        private IoCContainer()
        {

        }

        private void RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterType<CompanyRepository>().As<ICompanyRepository>().InstancePerDependency();
            builder.RegisterType<ArticleRepository>().As<IArticleRepository>().InstancePerDependency();
            builder.RegisterType<CategoryRepository>().As<ICategoryRepository>().InstancePerDependency();
            builder.RegisterType<SectionRepository>().As<ISectionRepository>().InstancePerDependency();
            builder.RegisterType<IndicatorRepository>().As<IIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<CompanyIndicatorRepository>().As<ICompanyIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<DreamDbContext>().InstancePerDependency();
            builder.RegisterType<ArticleService>().As<IArticleService>();

        }

        public static IoCContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new IoCContainer();
                }
                return _instance;
            }
        }
    }
}
