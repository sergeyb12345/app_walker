using dream.walker.data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Runtime.Caching;
using dream.walker.reader.Models;
using dream.walker.data.Entities.Indicators;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/playground")]
    public class PlaygroundApiController : ApiController
    {
        private IStrategyService _strategyService;
        private IPlaygroundService _playgroundService;
        private IDataCache _cache;

        public PlaygroundApiController(IStrategyService strategyService, IPlaygroundService playgroundService, IDataCache cache)
        {
            _strategyService = strategyService;
            _playgroundService = playgroundService;
            _cache = cache;
        }


        [HttpGet]
        [Route("{ticker}/{strategyId:int:min(1)}")]
        public async Task<IHttpActionResult> LoadPlayground(string ticker, int strategyId)
        {

            List<QuotesModel> quotes = await _cache.Get(ticker, 
                () => _playgroundService.LoadHistoryAsync(ticker));

            List<Indicator> idicators = await _cache.Get("indicators", 
                () => _playgroundService.LoadIndicatorsAsync(strategyId));


            return Ok();
        }


        public void Reset(int bars, int date)
        {

        }

        public void Next()
        {

        }

    }
}
