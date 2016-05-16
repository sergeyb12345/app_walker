using System.Collections.Generic;

namespace StockScanner.Interfaces.Indicators
{
    public interface IIndicatorFormula
    {
        Dictionary<string, double> IndicatorParams { get; }
        Dictionary<int, string> IndicatorCharts { get; }

        string Name { get; }
        string ToString(Dictionary<string, double> fparams);
        List<ICalculated> Calculate();
    }
}