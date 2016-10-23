using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using Newtonsoft.Json;
using System.Drawing;

namespace dream.walker.data.Entities
{
    public class Indicator
    {
        public Indicator()
        {
        }

        public int IndicatorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public QuotePeriod QuotePeriod { get; set; }
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
    }
}
