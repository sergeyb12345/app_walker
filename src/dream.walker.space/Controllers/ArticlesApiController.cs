using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace dream.walker.space.Controllers
{

    [Route("api/articles")]
    public class ArticlesApiController : ApiController
    {
        // GET: api/ArticlesApi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ArticlesApi/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ArticlesApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ArticlesApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ArticlesApi/5
        public void Delete(int id)
        {
        }
    }
}
