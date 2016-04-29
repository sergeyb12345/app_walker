using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.reader.Models
{
    public class CompanyModel
    {
        public string Ticker { get; set; }
        public string Name { get; set; }
        public decimal MarketCap { get; set; }
        public string Sector { get; set; }
        public string Industry { get; set; }
        public string SummaryUrl { get; set; }
    }
}
