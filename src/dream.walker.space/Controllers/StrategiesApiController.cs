using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Models;
using dream.walker.data.Services;

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
        [Route("getSummaries")]
        [ResponseType(typeof(List<StrategySummary>))]
        public async Task<IHttpActionResult> GeStrategySummaries()
        {
            var records = await _service.GetStrategiesAsync();
            return Ok(records);
        }

        [HttpGet]
        [Route("getByUrl/{url}")]
        [ResponseType(typeof(StrategyModel))]
        public async Task<IHttpActionResult> GetStrategyByUrl(string url)
        {
            var records = await _service.GetStrategyByUrlAsync(url);
            return Ok(records);
        }

        [HttpGet]
        [Route("get/{id:int:min(1)}")]
        [ResponseType(typeof(Strategy))]
        public async Task<IHttpActionResult> GetStrategyById(int id)
        {
            var records = await _service.GetStrategyAsync(id);
            return Ok(records);
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(StrategyModel))]
        public async Task<IHttpActionResult> SaveStrategy([FromBody] StrategyModel model)
        {

            var result = await _service.SaveStrategyAsync(model);

            return Ok(result);
        }
    }
}
