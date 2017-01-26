using System.Threading.Tasks;
using System.Web.Http;
using dream.walker.playground;
using System;
using System.Web.Http.Description;
using dream.walker.playground.Models;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/playground")]
    public class PlaygroundApiController : ApiController
    {
        private readonly IPlaygroundService _playgroundService;
        private PlaygroundProcessor _playground;

        public PlaygroundApiController(IPlaygroundService playgroundService)
        {
            _playgroundService = playgroundService;
        }

        [HttpGet]
        [ResponseType(typeof(PlaygroundChartModel))]
        [Route("{ticker}/{strategyId:int:min(1)}/{bars:int}")]
        public async Task<IHttpActionResult> LoadPlayground(string ticker, int strategyId, int bars)
        {
            _playground = await _playgroundService.LoadPlaygroundAsync(ticker, strategyId, false);
            var response = _playground.Initialize(Math.Max(50, bars), DateTime.MinValue);

            return Ok(response);
        }


        [HttpGet]
        [ResponseType(typeof(PlaygroundChartModel))]
        [Route("{ticker}/{strategyId:int:min(1)}/{bars:int}/next/{step:int:min(1)}")]
        public async Task<IHttpActionResult> Next(string ticker, int strategyId, int bars, int step)
        {
            if (_playground == null)
            {
                _playground = await _playgroundService.LoadPlaygroundAsync(ticker, strategyId, false);
                _playground.Initialize(Math.Max(50, bars), DateTime.MinValue);
            }
            var response = _playground.Next(step);

            return Ok(response);
        }

        [HttpGet]
        [ResponseType(typeof(PlaygroundChartModel))]
        [Route("{ticker}/{strategyId:int:min(1)}/{bars:int}/prev/{step:int:min(1)}")]
        public async Task<IHttpActionResult> Prev(string ticker, int strategyId, int bars, int step)
        {
            if (_playground == null)
            {
                _playground = await _playgroundService.LoadPlaygroundAsync(ticker, strategyId, false);
                _playground.Initialize(Math.Max(50, bars), DateTime.MinValue);
            }
            var response = _playground.Prev(step);

            return Ok(response);
        }

    }
}
