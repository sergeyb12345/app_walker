using System.Collections.Generic;
using dream.walker.reader.Models;

namespace dream.walker.reader
{
    public interface ICompanyFileReader
    {
        List<CompanyModel> Read(string filePath);
    }
}