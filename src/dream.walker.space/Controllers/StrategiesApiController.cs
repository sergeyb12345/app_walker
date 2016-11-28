using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using dream.walker.data.Entities.Strategies;
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
        [Route("getAll")]
        [ResponseType(typeof(List<Strategy>))]
        public async Task<IHttpActionResult> GetAllStrategies()
        {
            var records = await _service.GetStrategiesAsync(true);
            return Ok(records);
        }
    }
}
