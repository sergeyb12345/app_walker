using System.Collections.Generic;
using dream.walker.data.Enums;
using dream.walker.reader.Models;

namespace dream.walker.data.Extensions
{
    public static class QuotesModelExtensions
    {
        public static List<QuotesModel> ConvertToPeriod(this List<QuotesModel> dailyQuotes, QuotePeriod quotePeriod)
        {
            return dailyQuotes;
        }
    }
}
