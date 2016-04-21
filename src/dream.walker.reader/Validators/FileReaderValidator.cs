using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using CsvHelper;
using dream.walker.reader.Exceptions;

namespace dream.walker.reader.Validators
{
    public class FileReaderValidator : IFileReaderValidator
    {
        private readonly FileReaderConfiguration _configuration;

        public FileReaderValidator(FileReaderConfiguration configuration)
        {
            _configuration = configuration;
        }


        public void Validate<TClassMap, TClassModel>(string filePath)
            where TClassMap : CsvHelper.Configuration.CsvClassMap
        {
            using (var textreader = File.OpenText(filePath))
            {
                using (var csv = new CsvReader(textreader))
                {
                    _configuration.Configure<TClassMap>(csv);

                    while (csv.Read())
                    {
                        try
                        {
                            csv.GetRecord<TClassModel>();
                        }
                        catch (Exception e)
                        {
                            ThrowException(e);
                        }
                    }
                }
            }
        }

        private void ThrowException(Exception ex)
        {
            if (ex.Data.Contains("CsvHelper"))
            {
                var message = ex.Data["CsvHelper"].ToString();
                var msgLines = message.Split(new[] { '\r', '\n' }).Where(s => !string.IsNullOrWhiteSpace(s)).ToList();
                if (msgLines.Count > 4)
                {
                    var regex = new Regex(@"(['])(?:(?=(\\?))\2.)*?\1");
                    var line = regex.Match(msgLines[0]).Value;
                    var column = regex.Match(msgLines[3]).Value;
                    var value = regex.Match(msgLines[4]).Value;

                    message = $"Line {line} Import Error - Column {column} has an invalid value: {value}";
                }
                throw new FileReaderValidatorException(message);
            }
            throw ex;
        }

    }
}
