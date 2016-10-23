using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.space.Services.Models;
using dream.walker.space.Services.Requests;

namespace dream.walker.space.Services
{
    public interface IChartDataService
    {
        ChartDataResult GetChartData(GetChartDataRequest request);
    }
}
