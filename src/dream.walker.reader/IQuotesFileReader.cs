using System.Collections.Generic;
using dream.walker.reader.Models;

namespace dream.walker.reader
{
    public interface IQuotesFileReader
    {
        List<QuotesModel> Read(string filePath);
    }
}