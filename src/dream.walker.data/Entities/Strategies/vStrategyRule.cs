using dream.walker.data.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace dream.walker.data.Entities.Strategies
{
    /*
		S.[StrategyId], RS.[RuleSetId], RS.[Name] AS RuleSetName,
		R.[RuleId], R.[Name], R.[Period], R.[DataSeriesV1], R.[DataSeriesV2],
		R.[ConstV1], R.[ConstV2], R.[SkipItemsV1], R.[SkipItemsV2],
		R.[TakeItemsV1], R.[TakeItemsV2], R.[TransformItemsV1], R.[TransformItemsV2],
		R.[DataSourceV1], R.[DataSourceV2], R.[Condition]
     */

    [Table("vStrategyRule")]
    public class vStrategyRule
    {
        public int StrategyId { get; set; }
        public bool Optional { get; set; }
        public int RuleSetId { get; set; }
        public string RuleSetName { get; set; }
        public int OrderId { get; set; }
        public int RuleId { get; set; }
        public string RuleName { get; set; }
        public QuotePeriod Period { get; set; }
        public DataSourceType DataSourceV1 { get; set; }
        public DataSourceType DataSourceV2 { get; set; }
        public int DataSeriesV1  { get; set; }
        public int DataSeriesV2  { get; set; }
        public string ConstV1 { get; set; }
        public string ConstV2 { get; set; }
        public int SkipItemsV1 { get; set; }
        public int SkipItemsV2 { get; set; }
        public int TakeItemsV1 { get; set; }
        public int TakeItemsV2 { get; set; }
        public TransformFunction TransformItemsV1 { get; set; }
        public TransformFunction TransformItemsV2 { get; set; }
        public CompareOperator Condition { get; set; }

    }
}