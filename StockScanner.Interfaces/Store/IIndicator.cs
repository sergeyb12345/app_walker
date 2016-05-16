namespace StockScanner.Interfaces.Store
{
    public interface IIndicator
    {
        int Id { get; set; }

        string Name { get; set; }

        int FormulaTypeId { get; set; }
    }
}