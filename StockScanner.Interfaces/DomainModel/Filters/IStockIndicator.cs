using System.Collections.Generic;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainModel.Filters
{
    public interface IStockIndicator : IDomainModel
    {
        int IndicatorId { get; }
        string IndicatorName { get; }
        EnumFormulaType FormulaType { get; }
        List<IStockIndicatorParam> GetParams();
        Dictionary<int, string> GetIndicatorCharts();
    }
}