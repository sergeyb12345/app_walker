using System.Collections.Generic;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainModel.Conditions
{
    public interface IFilterCondition
    {
        int FilterId { get; }
        string ConditionName { get; }
        bool Active { get; }
        int ConditionId { get; }
        int OrderId { get; }
        double CalcValue1 { get; }
        double CalcValue2 { get; }
        bool Important { get; }

        IComparableValue CompareWhat { get; }
        IComparableValue CompareWith { get; }
        EnumCompareType? CompareHow { get; }

        bool Validate(List<IFilterConditionParam> inputParams);

        void SetCompareValue(bool isCompareWhatValue, double constantValue);
        void SetCompareValue(bool isCompareWhatValue, EnumPeriodType periodType, EnumQuoteType quoteType, int barOffset);
        void SetCompareValue(bool isCompareWhatValue, int filterIndicatorId, string indicatorChartName, int barOffset);

        void RegisterCondition();
        void MoveUp();
        void MoveDown();
        void Remove();
    }
}