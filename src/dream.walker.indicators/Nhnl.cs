using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{

    /// <summary>
    /// period = 20 days, 65 days and 356 days
    /// </summary>
    public class Nhnl : IIndicator<IndicatorModel, int>
    {
        public List<IndicatorModel> Calculate(List<QuotesModel> quotes, int period)
        {
            return null;
        }

        public override string ToString()
        {
            return $"NH-NL";
        }
    }
}
