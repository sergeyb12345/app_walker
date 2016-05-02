using System;
using CsvHelper.Configuration;

namespace dream.walker.reader.Models
{
    public class QuotesModelMap : CsvClassMap<QuotesModel>
    {
        public QuotesModelMap()
        {
            Map(m => m.Date).Name("date").Default(DateTime.MinValue);
            Map(m => m.Close).Name("close").Default(0);
            Map(m => m.VolumeAsText).Name("volume").Default("0");
            Map(m => m.Open).Name("open").Default(0);
            Map(m => m.High).Name("high").Default(0);
            Map(m => m.Low).Name("low").Default(0);
        }
    }
}