namespace StockScanner.Interfaces.Store
{
    public interface IIndustry : IStoreEntity
    {
        int SectorId { get; set; }
        string IndustryName { get; set; }
    }
}