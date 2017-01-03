using System.Collections.Generic;
using System.Threading.Tasks;
using dream.walker.data.Entities.Indicators;
using dream.walker.reader.Models;

namespace dream.walker.space.Controllers
{
    public interface IPlaygroundService
    {
        Task<List<QuotesModel>> LoadHistoryAsync(string ticker);
        Task<List<Indicator>> LoadIndicatorsAsync(int strategyId);
    }
}