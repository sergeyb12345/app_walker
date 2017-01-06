using System;
using dream.walker.data.Entities.Companies;

namespace dream.walker.data.Models
{
    public class CompanyHeader
    {
 
        public CompanyHeader(Company company)
        {
            Ticker = company.Ticker;
            Name = company.Name;
            Sector = company.Sector;
            Industry = company.Industry;
            LastUpdated = company.LastUpdated;
            Volume = company.Volume;
            Price = company.Price;
            HighestPrice52 = company.HighestPrice52;
            LowestPrice52 = company.LowestPrice52;
            ChaosPercentage = company.ChaosPercentage;
            UpdateSuccessful = company.UpdateSuccessful;
            UpdateError = company.UpdateError;
        }

        public CompanyHeader()
        {
            LastUpdated = DateTime.Today.AddMonths(-1);
        }

        public string FullName => $"{Ticker} - {Name}";
        public string Ticker { get; set; }
        public string Name { get; set; }
        public string Sector { get; set; }
        public string Industry { get; set; }
        public DateTime LastUpdated { get; set; }
        public decimal Volume { get; set; }
        public decimal Price { get; set; }
        public decimal HighestPrice52 { get; set; }
        public decimal LowestPrice52 { get; set; }
        public int ChaosPercentage { get; set; }
        public bool UpdateSuccessful { get; set; }
        public string UpdateError { get; set; }

    }
}
