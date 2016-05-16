namespace StockScanner.Interfaces.DomainModel.Filters
{
    public interface IStockIndicatorParamValue : IStockIndicatorParam
    {
        int FilterIndicatorId { get; }

        void SetParamValue(double value);
    }
}