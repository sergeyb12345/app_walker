namespace StockScanner.Interfaces.DomainModel.Filters
{
    public interface IStockIndicatorParam : IDomainModel
    {
        int ParamId { get; }
        int IndicatorId { get; }
        string ParamName { get; }
        double ParamValue { get; }
        string ParamKey { get; }
        void SetDefaulValue(double value);
    }
}