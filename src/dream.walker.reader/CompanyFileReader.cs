﻿using dream.walker.reader.Models;
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
