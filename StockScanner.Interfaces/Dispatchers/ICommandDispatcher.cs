using StockScanner.Interfaces.Commands;

namespace StockScanner.Interfaces.Dispatchers
{
    public interface ICommandDispatcher : IDispatcher
    {
        void Dispatch<TCommand>(TCommand command) where TCommand : IDomainCommand;
    }
}