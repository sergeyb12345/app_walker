﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.reader.Models;
using Newtonsoft.Json;

namespace dream.walker.data.Models
{
    public class CompanyToUpdate
    {
        public string Ticker { get; set; }
        public DateTime LastUpdated { get; set; }
        public string HistoryQuotesJson { get; set; }

        public List<QuotesModel> HistoryQuotes
        {
            get { return JsonConvert.DeserializeObject<List<QuotesModel>>(HistoryQuotesJson); }
            set { HistoryQuotesJson = JsonConvert.SerializeObject(value); }
        }

    }
}
