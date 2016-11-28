using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Services
{
    public interface IStrategyService
    {
        Task<List<Strategy>> GetStrategiesAsync(bool includeDeleted);
    }
}