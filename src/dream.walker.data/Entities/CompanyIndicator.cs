using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using dream.walker.data.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Entities
{
    public class CompanyIndicator
    {
        public string Ticker { get; set; }
        public DateTime LastUpdated { get; set; }
        public int IndicatorId { get; set; }
        public string JsonData { get; set; }

        [NotMapped]
        public List<IndicatorData> Data
        {
            get { return JsonConvert.DeserializeObject<List<IndicatorData>>(JsonData); }
            set { JsonData = JsonConvert.SerializeObject(value); }
        }
    }
}