using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Models;

namespace dream.walker.data.Services
{
    public interface IStrategyService
    {
        Task<List<StrategySummary>> GetStrategiesAsync();
        Task<StrategyModel> GetStrategyByUrlAsync(string url);
        Task<StrategyModel> SaveStrategyAsync(StrategyModel model);
        Task<Strategy> GetStrategyAsync(int id);
        Task DeleteStrategyAsync(int id);
    }
}