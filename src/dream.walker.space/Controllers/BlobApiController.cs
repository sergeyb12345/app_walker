using System.IO;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Autofac;
using dream.walker.data.Services;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/blob")]
    public class BlobApiController : ApiController
    {
        private readonly IArticleStorageService _storage;

        public BlobApiController(IArticleStorageService storage)
        {
            _storage = storage;
        }

        public BlobApiController()
        {
            _storage = IoC.IoCContainer.Instance.Container.Resolve<IArticleStorageService>();
        }

        [HttpPost]
        [Route("upload")]
        [ResponseType(typeof(string))]
        public async Task<IHttpActionResult> UploadSingle([FromBody] FileDetails file)
        {
            string url = null;

            if (!string.IsNullOrEmpty(file?.FileName))
            {
                var fileBody = file.ToByteArray();
                if (fileBody != null)
                {
                    using (var stream = new MemoryStream(fileBody))
                    {
                        url = await _storage.UploadImage(stream, file?.FileName, file.Category);
                    }
                }
            }

            return Ok(url);
        }

    }
}
