using StockScanner.Interfaces.DomainModel.Stock;

namespace StockScanner.Interfaces.DomainModel.Filters
{
    public interface IStockFilterCompany : IStockCompany
    {
        int FilterId { get; }

        int Score { get; }
    }
}