using System.Configuration;
using Autofac;
using dream.walker.data;
using dream.walker.data.Azure;
using dream.walker.data.Repositories;
using dream.walker.data.Services;
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

            builder.RegisterType<CompanyRepository>().As<ICompanyRepository>().InstancePerDependency();
            builder.RegisterType<ArticleRepository>().As<IArticleRepository>().InstancePerDependency();
            builder.RegisterType<CategoryRepository>().As<ICategoryRepository>().InstancePerDependency();
            builder.RegisterType<SectionRepository>().As<ISectionRepository>().InstancePerDependency();
            builder.RegisterType<IndicatorRepository>().As<IIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<StrategyRepository>().As<IStrategyRepository>().InstancePerDependency();
            builder.RegisterType<CompanyIndicatorRepository>().As<ICompanyIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<RuleRepository>().As<IRuleRepository>().InstancePerDependency();
            builder.RegisterType<RuleSetRepository>().As<IRuleSetRepository>().InstancePerDependency();
            builder.RegisterType<StrategyRuleSetRepository>().As<IStrategyRuleSetRepository>().InstancePerDependency();
            builder.RegisterType<CompanyRuleSetRepository>().As<ICompanyRuleSetRepository>().InstancePerDependency();

            builder.RegisterType<DreamDbContext>().InstancePerDependency();

            builder.RegisterType<ArticleService>().As<IArticleService>();
            builder.RegisterType<RuleService>().As<IRuleService>();
            builder.RegisterType<StrategyService>().As<IStrategyService>();
            builder.Register(c => new StorageAccountConfiguration
            {
                AccountName = ConfigurationManager.AppSettings["AzureStorageAccountName"],
                ConnectionString = ConfigurationManager.AppSettings["AzureStorageConnection"]
            }).SingleInstance();

            builder.RegisterType<AzureStorageClient>().As<IStorageClient>();
            builder.RegisterType<ArticleStorageService>().As<IArticleStorageService>();



            return builder.Build();
        }
    }
}
