namespace StockScanner.Interfaces.Store
{
    public interface ISector : IStoreEntity
    {
        string SectorName { get; set; }
    }
}