using System;
using dream.walker.data.Models;

namespace dream.walker.space.Controllers
{
    public class FileDetails
    {
        public string FileName { get; set; }
        public string FileBody { get; set; }
        public FileCategory Category { get; set; }

        public byte[] ToByteArray()
        {
            if (!string.IsNullOrWhiteSpace(FileBody))
            {
                var pos = FileBody.IndexOf("base64", StringComparison.Ordinal);
                if (pos > 0)
                {
                    var fileBody = FileBody.Substring(pos + "base64,".Length);

                    try
                    {
                        var data = Convert.FromBase64String(fileBody);
                        return data;
                    }
                    catch (Exception) { }
                }
            }
            return null;
        }
    }
}