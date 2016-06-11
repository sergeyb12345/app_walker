using System.Collections.Generic;
using dream.walker.reader.Models;

namespace dream.walker.station.Processors.IndicatorProcessor
{
    public interface IIndicatorProcessor
    {
        string Process(List<QuotesModel> quotes);
    }
}