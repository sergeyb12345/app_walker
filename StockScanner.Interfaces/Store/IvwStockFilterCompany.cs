namespace StockScanner.Interfaces.Store
{
    public interface IvwStockFilterCompany : IVwStockCompany
    {
        int FilterId { get; set; }

        int Score { get; set; }
    }
}