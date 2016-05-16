namespace StockScanner.Interfaces.Store
{
    public interface IVwStockCompany
    {
        int Id { get; set; }

        string Ticker { get; set; }

        int? ExchangeId { get; set; }

        string CompanyName { get; set; }

        int? IndustryId { get; set; }

        string ExchangeName { get; set; }

        string IndustryName { get; set; }

        int? SectorId { get; set; }

        string SectorName { get; set; }

        bool Active { get; set; }
    }
}