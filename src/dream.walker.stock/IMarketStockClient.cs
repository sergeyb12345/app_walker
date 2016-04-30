using System.Threading.Tasks;
using dream.walker.stock.Requests;

namespace dream.walker.stock
{
    public interface IMarketStockClient
    {
        Task<string> GetStockHistory(GetStockHistoryRequest request);
    }
}