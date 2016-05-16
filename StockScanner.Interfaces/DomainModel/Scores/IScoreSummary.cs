using System;

namespace StockScanner.Interfaces.DomainModel.Scores
{
    public interface IScoreSummary
    {
        int UniqueId { get; }

        int FilterId { get; }

        int StockId { get; }

        int SuccessRate { get; }

        string Ticker { get; }

        string CompanyName { get; }

        string FilterName { get; }

        DateTime ScoreDate { get; }
    }
}