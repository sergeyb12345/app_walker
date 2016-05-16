namespace StockScanner.Interfaces.Store
{
    public interface IvwStockIndicatorParam
    {
        int ParamId { get; set; }

        string ParamName { get; set; }

        string ParamKey { get; set; }

        int IndicatorId { get; set; }

        double DefaultValue { get; set; }
    }
}