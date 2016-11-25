using System;
using System.IO;
using System.Threading.Tasks;
using dream.walker.data.Models;

namespace dream.walker.data.Services
{
    public interface IArticleStorageService
    {
        Task<string> UploadImage(Stream fileStream, string fileName, FileCategory category);
        void DeleteImage(Uri url);
    }
}
