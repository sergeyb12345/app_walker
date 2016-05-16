using System.Collections.Generic;

namespace StockScanner.Interfaces.DomainModel.Scores
{
    public interface IScoreResult
    {
        List<IScoreDetails> Details { get; }
        int FilterId { get; }
        int StockId { get; }
        int ScoreRate { get; }

        void Register();
    }
}