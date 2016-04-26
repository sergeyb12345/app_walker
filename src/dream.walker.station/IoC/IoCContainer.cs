using Autofac;
using dream.walker.data;
using dream.walker.data.Repositories;
using dream.walker.reader;
using dream.walker.reader.Validators;

namespace dream.walker.station.IoC
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

            builder.RegisterType<CompanyFileReader>().As<ICompanyFileReader>().InstancePerDependency();
            builder.RegisterType<FileReaderValidator>().As<IFileReaderValidator>().InstancePerDependency();
            builder.RegisterType<CompanyRepository>().As<ICompanyRepository>().InstancePerDependency();
            builder.RegisterType<FileReaderConfiguration>().SingleInstance();
            builder.RegisterType<DreamDbContext>().InstancePerDependency();

            return builder.Build();
        }
    }
}
