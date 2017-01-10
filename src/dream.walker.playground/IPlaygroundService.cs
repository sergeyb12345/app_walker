using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Autofac;
using dream.walker.cache;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Repositories;
using dream.walker.reader;
using dream.walker.reader.Models;
using dream.walker.stock;
using dream.walker.stock.Requests;

namespace dream.walker.playground
{
    public interface IPlaygroundService
    {
        Task<List<QuotesModel>> LoadHistoryAsync(string ticker);
        Task<List<Indicator>> LoadIndicatorsAsync(int strategyId);
    }

    public class PlaygroundService : IPlaygroundService
    {
        private readonly ILifetimeScope _container;
        private readonly IDataCache _cache;

        public PlaygroundService(ILifetimeScope container, IDataCache cache)
        {
            _container = container;
            _cache = cache;
        }

        public async Task<List<QuotesModel>> LoadHistoryAsync(string ticker)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var client = scope.Resolve<IMarketStockClient>();
                var reader = scope.Resolve<IQuotesFileReader>();

                var csvQuotes = await client.GetStockHistory(new GetStockHistoryRequest
                {
                    Ticker = ticker,
                    FromDate = DateTime.Today.AddYears(-5)
                });

                if(!string.IsNullOrEmpty(csvQuotes))
                {
                    var quotes = reader.Read(csvQuotes);
                    return quotes;
                }

                return new List<QuotesModel>();
            }
        }

        public async Task<List<Indicator>> LoadIndicatorsAsync(int strategyId)
        {
            using (var scope = _container.BeginLifetimeScope())
            {
                var repository = scope.Resolve<IIndicatorRepository>();
                var records = await repository.GetByStrategyIdAsync(strategyId);
                return records;
            }
        }

        public async Task<PlaygroundProcessor> LoadPlayground(string ticker, int strategyId, bool refreshCache)
        {
            var key = $"{ticker}-{strategyId}";

            if (refreshCache)
            {
                _cache.Delete(key);    
            }

            return await _cache.Get(key, () => LoadPlayground(ticker, strategyId));
        }

        private async Task<PlaygroundProcessor> LoadPlayground(string ticker, int strategyId)
        {
            var indicators = await LoadIndicatorsAsync(strategyId);

            using (var scope = _container.BeginLifetimeScope())
            {
                var indicatorProcessorFactory = scope.Resolve<IndicatorProcessorFactory>();
                var companyRepository = scope.Resolve<ICompanyRepository>();
                var company = companyRepository.Get(ticker);

                return new PlaygroundProcessor(company, indicators, indicatorProcessorFactory);
            }
        }

    }
}