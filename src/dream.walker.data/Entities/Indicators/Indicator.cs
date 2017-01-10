using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Entities.Indicators
{
    public class Indicator
    {
        public Indicator()
        {
        }

        public int IndicatorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public QuotePeriod Period { get; set; }
        public string JsonParams { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool Deleted { get; set; }
        public int ChartPlotNumber { get; set; }
        public string ChartColor { get; set; }

        [NotMapped]
        public List<IndicatorParam> Params {
            get { return JsonConvert.DeserializeObject<List<IndicatorParam>>(JsonParams); }
            set { JsonParams = JsonConvert.SerializeObject(value); }
        }

        public ChartType ChartType { get; set; }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(Name) || string.IsNullOrWhiteSpace(JsonParams))
            {
                return base.ToString();
            }
            else
            {
                return $"{Name.ToUpper()}({string.Join(",", Params.Select(p => p.Value).ToArray())})";
            }
        }
    }
}
