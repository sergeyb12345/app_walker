using System.Collections.Generic;
using System.IO;
using CsvHelper;
using dream.walker.reader.Validators;

namespace dream.walker.reader
{
    public class FileReader<TClassMap, TClassModel> where TClassMap : CsvHelper.Configuration.CsvClassMap
    {
        protected readonly FileReaderConfiguration Configuration;
        protected readonly IFileReaderValidator Validator;

        public FileReader(FileReaderConfiguration configuration, IFileReaderValidator validator)
        {
            Configuration = configuration;
            Validator = validator;
        }



        public List<TClassModel> Read(string filePath)
        {
            Validator.Validate<TClassMap, TClassModel>(filePath);

            var result = new List<TClassModel>();
            using (var textreader = File.OpenText(filePath))
            {
                using (var csv = new CsvReader(textreader))
                {
                    Configuration.Configure<TClassMap>(csv);

                    while (csv.Read())
                    {
                        var model = csv.GetRecord<TClassModel>();
                        result.Add(model);
                    }
                }
            }
            return result;
        }
    }
}
