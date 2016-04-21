using CsvHelper.Configuration;

namespace dream.walker.reader.Models
{
    public class CompanyModelMap : CsvClassMap<CompanyModel>
    {
        public CompanyModelMap()
        {
            Map(m => m.Symbol).Index(0);
            Map(m => m.Name).Index(1);
            Map(m => m.MarketCap).Index(3).Default(0);
            Map(m => m.Sector).Index(6).Default("n/a");
            Map(m => m.Industry).Index(7).Default("n/a");
            Map(m => m.SummaryUrl).Index(8).Default("");
        }
    }
}