using System;

namespace StockScanner.Interfaces.Store
{
    public interface IvwStockFilterScoreDetail
    {
        int ScoreId { get; set; }

        int ConditionId { get; set; }

        int StockId { get; set; }

        int FilterId { get; set; }

        bool IsValid { get; set; }

        string ConditionName { get; set; }

        DateTime DateTested { get; set; }

        int OrderId { get; set; }

        double Value1 { get; set; }

        double Value2 { get; set; }
    }
}