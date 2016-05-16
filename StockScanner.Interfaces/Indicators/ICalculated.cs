using System;

namespace StockScanner.Interfaces.Indicators
{
    public interface ICalculated : ICloneable
    {
        int CalculatedItemId { get; }
        int TimePeriod { get; }
        DateTime Date { get; }
        ICalculated Previous { get; set; }

        double GetValue(string key);
        double GetValue(string key, int pastBars);
        void SetValue(string key, double value);
        void MoveValue(string sourceKey, string destKey);

        double GetDelta(string key);
        double GetDelta(string key, int pastBars);
    }
}