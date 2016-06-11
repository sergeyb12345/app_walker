using System.Collections.Generic;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators
{
    public interface IIndicator<TModel, TParams> where TModel : IIndicatorModel
    {
        List<TModel> Calculate(List<QuotesModel> quotes, TParams inputParams);
        string Name { get; }
    }
}