using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Entities.Indicators;
using dream.walker.reader.Models;
using Autofac;
using dream.walker.data.Repositories;
using dream.walker.stock;
using dream.walker.stock.Requests;
using dream.walker.reader;

namespace dream.walker.data.Services
{
    public interface IPlaygroundService
    {
        Task<List<QuotesModel>> LoadHistoryAsync(string ticker);
        Task<List<Indicator>> LoadIndicatorsAsync(int strategyId);
    }

    public class PlaygroundService : IPlaygroundService
    {
        private readonly ILifetimeScope _container;

        public PlaygroundService(ILifetimeScope container)
        {
            _container = container;
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
    }
}