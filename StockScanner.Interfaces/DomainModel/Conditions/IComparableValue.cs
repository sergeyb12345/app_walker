using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainModel.Conditions
{
    public interface IComparableValue
    {
        EnumCompareSource CompareSource { get; }

        double? ConstantValue { get; }

        EnumPeriodType? PeriodType { get; }

        EnumQuoteType? QuoteType { get; }

        EnumFinancialsType? FinancialsType { get; }

        int? BarOffset { get; }

        int? FilterIndicatorId { get; }

        string IndicatorChartName { get; }

        void RegisterCompareValue(int conditionId, bool isCompareWhatValue);
    }
}