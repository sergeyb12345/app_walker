using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Services
{
    public interface IStrategyService
    {
        Task<List<Strategy>> GetStrategiesAsync(bool includeDeleted);
        Task<Strategy> GetStrategyByUrlAsync(string url);
        Task<Strategy> SaveStrategyAsync(Strategy model);
        Task<Strategy> GetStrategyAsync(int id);
    }
}