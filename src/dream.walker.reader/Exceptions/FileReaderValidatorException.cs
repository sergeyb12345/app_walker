using System;

namespace dream.walker.reader.Exceptions
{
    public class FileReaderValidatorException : Exception
    {
        public FileReaderValidatorException(string message)
            : base(message)
        {
        }
    }
}
