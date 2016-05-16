using StockScanner.Interfaces.Commands;

namespace StockScanner.Interfaces.CommandHandlers
{
    public interface IDomainCommandHandler<TCommand> where TCommand : IDomainCommand
    {
        void Handle(TCommand command);
    }
}