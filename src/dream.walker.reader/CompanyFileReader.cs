using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.reader.Models;
using dream.walker.reader.Validators;

namespace dream.walker.reader
{
    public class CompanyFileReader : FileReader<CompanyModelMap, CompanyModel>, ICompanyFileReader
    {

        public CompanyFileReader(FileReaderConfiguration configuration, IFileReaderValidator validator)
            : base(configuration, validator)
        {
        }

    }
}
