using StockScanner.Interfaces.Queries;

namespace StockScanner.Interfaces.QueryHandlers
{
    public interface IDomainQueryHandler<TQuery, TParams>
        where TParams : class
        where TQuery : IDomainQuery<TParams>
    {
        TResult HandleQuery<TResult>(TQuery query) where TResult : class;
    }
}