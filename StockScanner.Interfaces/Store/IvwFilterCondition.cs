namespace StockScanner.Interfaces.Store
{
    public interface IvwFilterCondition
    {
        int ConditionId { get; set; }

        int FilterId { get; set; }

        bool Active { get; set; }

        int? CompareTypeId { get; set; }

        string ConditionName { get; set; }

        int? CompareWhatId { get; set; }

        int? CompareWhatSource { get; set; }

        double? CompareWhatConstValue { get; set; }

        int? CompareWhatPeriodType { get; set; }

        int? CompareWhatQuoteType { get; set; }

        int? CompareWhatBarOffset { get; set; }

        int? CompareWhatFilterIndicatorId { get; set; }

        int? CompareWhatFinancialsType { get; set; }

        string CompareWhatIndicatorChart { get; set; }

        int? CompareWithId { get; set; }

        int? CompareWithSource { get; set; }

        double? CompareWithConstValue { get; set; }

        int? CompareWithPeriodType { get; set; }

        int? CompareWithQuoteType { get; set; }

        int? CompareWithBarOffset { get; set; }

        int? CompareWithFilterIndicatorId { get; set; }

        string CompareWithIndicatorChart { get; set; }

        int? CompareWithFinancialsType { get; set; }

        int OrderId { get; set; }

        bool Important { get; set; }
    }
}