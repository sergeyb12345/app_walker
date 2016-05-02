using System;
using System.IO;
using System.Linq;
using System.Text;
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
            if (IsFile(filePath))
            {
                ValidateFile<TClassMap, TClassModel>(filePath);
            }
            else
            {
                ValidateString<TClassMap, TClassModel>(filePath);
            }
        }


        private void ValidateString<TClassMap, TClassModel>(string filePath)
            where TClassMap : CsvHelper.Configuration.CsvClassMap
        {
            if (filePath.StartsWith("<!DOCTYPE"))
            {
                throw   new Exception("CSV format is invalid. Received HTML file");
            }

            using (var textreader = CreateStreamReader(filePath))
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


        private void ValidateFile<TClassMap, TClassModel>(string filePath)
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
