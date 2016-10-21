﻿using Autofac;
using dream.walker.calculators;
using dream.walker.data;
using dream.walker.data.Repositories;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.reader.Validators;
using dream.walker.stock;
using dream.walker.stock.Nasdaq.Client;
using Dream.WebJob.Quotes.Jobs;

namespace Dream.WebJob.Quotes.IoC
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
            builder.RegisterType<QuotesFileReader>().As<IQuotesFileReader>().InstancePerDependency();
            builder.RegisterType<FileReaderValidator>().As<IFileReaderValidator>().InstancePerDependency();
            builder.RegisterType<CompanyRepository>().As<ICompanyRepository>().InstancePerDependency();
            builder.RegisterType<IndicatorRepository>().As<IIndicatorRepository>().InstancePerDependency();
            builder.RegisterType<CompanyIndicatorRepository>().As<ICompanyIndicatorRepository>().InstancePerDependency();

            builder.RegisterType<CompanyManagerService>().As<ICompanyManagerService>().As<ICompanyService>().InstancePerDependency();
            builder.RegisterType<CompanyIndicatorService>().As<ICompanyIndicatorService>().InstancePerDependency();
            builder.RegisterType<FileReaderConfiguration>().SingleInstance();
            builder.RegisterType<DreamDbContext>().InstancePerDependency();
            builder.RegisterType<QuotesImportJob>().As<IJob>().As<IQuotesImportJob>();
            builder.RegisterType<HealthCheckJob>().As<IJob>().As<IHealthCheckJob>();
            builder.RegisterType<IndicatorCalculateJob>().As<IJob>().As<IIndicatorCalculateJob>();
            builder.RegisterType<EmaIndicatorCalculator>().As<IIndicatorCalculator>();
            builder.Register(c => new NasdaqStockClientConfig { Proxy = "" }).SingleInstance();
            builder.RegisterType<NasdaqStockClient>().As<IMarketStockClient>();

            return builder.Build();
        }
    }
}