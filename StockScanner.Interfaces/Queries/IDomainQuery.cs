namespace StockScanner.Interfaces.Queries
{
    public interface IDomainQuery<TParams>
        where TParams : class
    {
        TParams Parameters { get; }
    }
}