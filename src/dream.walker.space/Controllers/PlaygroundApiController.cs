using dream.walker.data.Services;
using System.Threading.Tasks;
using System.Web.Http;
using dream.walker.cache;
using dream.walker.data.Requests;
using dream.walker.playground;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/playground")]
    public class PlaygroundApiController : ApiController
    {
        private IStrategyService _strategyService;
        private readonly IPlaygroundService _playgroundService;

        private IDataCache _cache;
        public readonly PlaygroundProcessor _playgroundProcessor;
        private readonly ICompanyService _companyService;


        public PlaygroundApiController(IStrategyService strategyService, 
            IPlaygroundService playgroundService, IDataCache cache,
            PlaygroundProcessor playgroundProcessor,
            ICompanyService companyService)
        {
            _strategyService = strategyService;
            _playgroundService = playgroundService;
            _cache = cache;
            _playgroundProcessor = playgroundProcessor;
            _companyService = companyService;
        }


        [HttpGet]
        [Route("{ticker}/{strategyId:int:min(1)}")]
        public async Task<IHttpActionResult> LoadPlayground(string ticker, int strategyId)
        {
           
            var historicalData = _cache.Get(ticker,
                () => _companyService.GetQuotes(ticker));

            if (historicalData.Count < 500)
            {
                historicalData = await _playgroundService.LoadHistoryAsync(ticker);
                _companyService.UpdateQuotes(new UpdateQuotesRequest(ticker, historicalData));

                _cache.Set(ticker, historicalData);
            }

            var indicators = await _cache.Get($"indicators-{strategyId}",
                () => _playgroundService.LoadIndicatorsAsync(strategyId));

            var company = await _companyService.GetAsync(ticker);


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
