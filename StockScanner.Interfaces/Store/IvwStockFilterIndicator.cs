namespace StockScanner.Interfaces.Store
{
    public interface IvwStockFilterIndicator
    {
        int Id { get; set; }

        int FilterId { get; set; }

        int IndicatorId { get; set; }

        string IndicatorName { get; set; }

        int PeriodId { get; set; }

        int OrderId { get; set; }

        bool Active { get; set; }

        int FormulaTypeId { get; set; }
    }
}