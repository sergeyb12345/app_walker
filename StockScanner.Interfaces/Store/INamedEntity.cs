namespace StockScanner.Interfaces.Store
{
    public interface INamedEntity : IStoreEntity
    {
        string Name { get; set; }
    }
}