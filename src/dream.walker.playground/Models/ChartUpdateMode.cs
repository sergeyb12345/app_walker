using System.Collections.Generic;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class ChartUpdateMode
    {
        public enum UpdateMode
        {
            Reset,
            Insert,
            Append
        }

        public ChartUpdateMode(UpdateMode mode, List<QuotesModel> quotes)
        {
            Mode = mode.ToString().ToLower();
            ModeType = mode;
            Bars = (quotes ?? new List<QuotesModel>()).Count;
            Quotes = quotes;
        }

        public List<QuotesModel> Quotes { get; set; }

        public UpdateMode ModeType { get; set; }

        public string Mode { get; set; }
        public int Bars { get; set; }
    }
}