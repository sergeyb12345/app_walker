using Autofac;
using dream.walker.data;
using dream.walker.data.Repositories;
using dream.walker.reader.Validators;
using dream.walker.space.Services;

namespace dream.walker.tests
{
    public class IoCContainer
    {
        private static ILifetimeScope _instance;

        private IoCContainer()
        {

        }

        public static ILifetimeScope Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new IoCContainer().Create();
                }
                return _instance;
            }
        }

        private ILifetimeScope Create()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<FileReaderValidator>().As<IFileReaderValidator>().InstancePerDependency();
            builder.RegisterType<CompanyRepository>().As<ICompanyRepository>().InstancePerDependency();
            builder.RegisterType<IndicatorRepository>().As<IIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<CompanyIndicatorRepository>().As<ICompanyIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<ChartDataService>().As<IChartDataService>().InstancePerDependency();

            builder.RegisterType<DreamDbContext>().InstancePerDependency();

            return builder.Build();
        }
    }
}
