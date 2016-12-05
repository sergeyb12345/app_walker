using dream.walker.data.Enums;

namespace dream.walker.data.Entities.Strategies
{
    public class Rule
    {
        public int RuleId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }
        public QuotePeriod Period { get; set; }

        public DataSourceType DataSouceV1 { get; set; }
        public DataSourceType DataSouceV2 { get; set; }
        public int DataSeriesV1  { get; set; }
        public int DataSeriesV2  { get; set; }
        public string ConstV1 { get; set; }
        public string ConstV2 { get; set; }
        public int SkipItemsV1 { get; set; }
        public int SkipItemsV2 { get; set; }
        public int TakeItemsV1 { get; set; }
        public int TakeItemsV2 { get; set; }
        public TransformFuction TransformItemsV1 { get; set; }
        public TransformFuction TransformItemsV2 { get; set; }
        public CompareOperator Condition { get; set; }

    }

    public enum TransformFuction
    {
        First = 0,
        Max,
        Sum,
        Avg
    }

    public enum DataSourceType
    {
        Indicator=0,
        HistoricalData,
        Constant
    }
}