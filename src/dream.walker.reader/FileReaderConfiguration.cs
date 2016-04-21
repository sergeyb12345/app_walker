using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;

namespace dream.walker.reader
{
    public class FileReaderConfiguration
    {
        public void Configure<TClassMap>(CsvReader reader)
            where TClassMap : CsvHelper.Configuration.CsvClassMap
        {
            reader.Configuration.Delimiter = ",";
            reader.Configuration.HasHeaderRecord = true;
            reader.Configuration.TrimHeaders = true;
            reader.Configuration.IsHeaderCaseSensitive = false;
            reader.Configuration.SkipEmptyRecords = true;
            reader.Configuration.TrimFields = true;
            reader.Configuration.Quote = '"';
            reader.Configuration.RegisterClassMap<TClassMap>();
        }
    }
}
