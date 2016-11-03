using System.Collections.Generic;
using dream.walker.reader.Models;

namespace dream.walker.calculators.IndicatorProcessor
{
    public interface IIndicatorProcessor
    {
        string Process(string companyTicker, List<QuotesModel> quotes);
    }
}