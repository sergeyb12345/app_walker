using System.Collections.Generic;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class CommpanyChartData
    {
        public CommpanyChartData()
        {
            Quotes = new List<QuotesModel>();
        }

        public string Name { get; set; }
        public List<QuotesModel> Quotes { get; set; }

    }
}