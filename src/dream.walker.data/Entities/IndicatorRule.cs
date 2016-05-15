using System.ComponentModel.DataAnnotations.Schema;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Entities
{
    public class IndicatorRule
    {
        public int Id { get; set; }
        public int RuleId { get; set; }
        public int IndicatorId { get; set; }
        public RuleFunction Function { get; set; }
        public CompareOperator Condition { get; set; }
        public string JsonCompareWhat { get; set; }
        public string JsonCompareWith { get; set; }

        [NotMapped]
        public ValueLocation CompareWhat
        {
            get { return JsonConvert.DeserializeObject<ValueLocation>(JsonCompareWhat); }
            set { JsonCompareWhat = JsonConvert.SerializeObject(value); }
        }

        [NotMapped]
        public ValueLocation CompareWith
        {
            get { return JsonConvert.DeserializeObject<ValueLocation>(JsonCompareWith); }
            set { JsonCompareWith = JsonConvert.SerializeObject(value); }
        }
    }
}