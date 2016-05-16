using System;

namespace StockScanner.Interfaces.DomainModel.Scores
{
    public interface IScoreDetails
    {
        int ScoreId { get; }

        int ConditionId { get; }

        int StockId { get; }

        int FilterId { get; }

        bool IsValid { get; }

        string ConditionName { get; }

        DateTime DateTested { get; }

        double Value1 { get; }

        double Value2 { get; }

        #region Model Actions

        void Register();

        #endregion
    }
}