using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using dream.walker.data.Enums;
using dream.walker.data.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Entities
{
    public class Indicator
    {
        public int IndicatorId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public QuotePeriod QuotePeriod { get; set; }
        public string JsonParams { get; set; }
        public DateTime LastUpdated { get; set; }
        public bool Deleted { get; set; }

        [NotMapped]
        public List<IndicatorParam> Params {
            get { return JsonConvert.DeserializeObject<List<IndicatorParam>>(JsonParams); }
            set { JsonParams = JsonConvert.SerializeObject(value); }
        }
    }
}
