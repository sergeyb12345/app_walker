using System.Collections.Generic;
using System.IO;
using System.Text;
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


        public List<TClassModel> Read(string source)
        {
            Validator.Validate<TClassMap, TClassModel>(source);

            if (IsFile(source))
            {
                return ReadFile(source);
            }
            else
            {
                return ReadString(source);
            }
        }


        private List<TClassModel> ReadFile(string filePath)
        {

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

        private List<TClassModel> ReadString(string content)
        {

            var result = new List<TClassModel>();
            using (var textreader = CreateStreamReader(content))
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

        private bool IsFile(string source)
        {
            return !string.IsNullOrEmpty(source) &&
              !(source.IndexOfAny(Path.GetInvalidPathChars()) >= 0) &&
              File.Exists(source);
        }

        private TextReader CreateStreamReader(string content)
        {
            byte[] byteArray = Encoding.UTF8.GetBytes(content);
            //byte[] byteArray = Encoding.ASCII.GetBytes(contents);
            MemoryStream stream = new MemoryStream(byteArray);

            // convert stream to string
            return new StreamReader(stream);
        }
    }
}
