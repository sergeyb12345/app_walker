namespace StockScanner.Interfaces.Store
{
    public interface IStock : INamedEntity
    {
        string Ticker { get; set; }

        int? ExchangeId { get; set; }

        int? IndustryId { get; set; }
    }
}