using System.Collections.Generic;
using StockScanner.Interfaces.Queries;
using StockScanner.Interfaces.QueryHandlers;

namespace StockScanner.Interfaces.Dispatchers
{
    public interface IQueryDispatcher : IDispatcher
    {
        List<IDomainQueryHandler<TQuery, TParams>> Dispatch<TQuery, TParams>(TQuery query)
            where TParams : class
            where TQuery : IDomainQuery<TParams>;

        TResult DispatchAndHandle<TQuery, TParams, TResult>(TQuery query)
            where TParams : class
            where TResult : class
            where TQuery : IDomainQuery<TParams>;
    }
}