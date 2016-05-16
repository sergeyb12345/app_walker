namespace StockScanner.Interfaces.Store
{
    public interface IvwStockFilterIndicatorParam
    {
        int ParamId { get; set; }

        int FilterIndicatorId { get; set; }

        int IndicatorId { get; set; }

        int FilterId { get; set; }

        string IndicatorName { get; set; }

        string ParamName { get; set; }

        string ParamKey { get; set; }

        double ParamValue { get; set; }
    }
}