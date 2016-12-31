using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dream.walker.data.Requests
{
    public class CompanySearchRequest
    {
        public CompanySearchRequest()
        {
            MaxCount = 20;
        }

        public string Ticker { get; set; }
        public int MaxCount { get; set; }
    }
}
