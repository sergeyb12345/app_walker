using dream.walker.data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
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

        public List<QuotesModel> _quotes;
        public List<Indicator> _idicators;

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

            _quotes = await _cache.Get(ticker, 
                () => _playgroundService.LoadHistoryAsync(ticker));

            _idicators = await _cache.Get($"indicators-{strategyId}", 
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
