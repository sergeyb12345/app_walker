using CsvHelper.Configuration;

namespace dream.walker.reader.Models
{
    public class CompanyModelMap : CsvClassMap<CompanyModel>
    {
        public CompanyModelMap()
        {
            Map(m => m.Ticker).Index(1);
            Map(m => m.Name).Index(2);
            Map(m => m.Exchange).Index(3);
            Map(m => m.IsActive).Index(4).Default(0);
            Map(m => m.StartDateString).Index(5);
        }
    }
}