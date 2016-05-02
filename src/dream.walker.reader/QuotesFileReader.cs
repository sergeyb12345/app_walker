using dream.walker.reader.Models;
using dream.walker.reader.Validators;

namespace dream.walker.reader
{
    public class QuotesFileReader : FileReader<QuotesModelMap, QuotesModel>, IQuotesFileReader
    {

        public QuotesFileReader(FileReaderConfiguration configuration, IFileReaderValidator validator)
            : base(configuration, validator)
        {
        }

    }
}