using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using dream.walker.data.Entities.Articles;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Services;
using dream.walker.space.Models.Articles;
using Newtonsoft.Json;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/strategy")]
    public class StrategiesApiController : ApiController
    {
        private readonly IStrategyService _service;

        public StrategiesApiController(IStrategyService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("getAll")]
        [ResponseType(typeof(List<Strategy>))]
        public async Task<IHttpActionResult> GetAllStrategies()
        {
            var records = await _service.GetStrategiesAsync(true);
            return Ok(records);
        }

        [HttpGet]
        [Route("getByUrl/{url}")]
        [ResponseType(typeof(Strategy))]
        public async Task<IHttpActionResult> GetStrategyByUrl(string url)
        {
            var records = await _service.GetStrategyByUrlAsync(url);
            return Ok(records);
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(Strategy))]
        public async Task<IHttpActionResult> SaveStrategy([FromBody] Strategy model)
        {

            var result = await _service.SaveStrategyAsync(model);

            return Ok(result);
        }
    }
}
