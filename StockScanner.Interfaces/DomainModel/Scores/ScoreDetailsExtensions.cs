using System;
using System.Collections.Generic;
using System.Text;

namespace StockScanner.Interfaces.DomainModel.Scores
{
    public static class ScoreDetailsExtensions
    {
        public static string ToXml(this List<IScoreDetails> scores)
        {
            var sb = new StringBuilder();
            foreach (var score in scores)
            {
                sb.AppendFormat("<cond id='{0}' valid='{1}' val1='{2}' val2='{3}' />",
                    score.ConditionId, score.IsValid ? 1 : 0, Math.Round(score.Value1, 4), Math.Round(score.Value2, 4));
            }

            return string.Format("<score>{0}</score>", sb);
        }
    }
}