using dream.walker.data.Services;
using System.Threading.Tasks;
using System.Web.Http;
using dream.walker.data.Enums;
using dream.walker.playground;
using dream.walker.playground.Models;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/playground")]
    public class PlaygroundApiController : ApiController
    {
        private IStrategyService _strategyService;
        private readonly IPlaygroundService _playgroundService;

        private IDataCache _cache;
        private readonly PlaygroundProcessor _playgroundProcessor;
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
            var historicalData = await _cache.Get(ticker,
                () => _playgroundService.LoadHistoryAsync(ticker));

            var indicators = await _cache.Get($"indicators-{strategyId}",
                () => _playgroundService.LoadIndicatorsAsync(strategyId));

            var company = _companyService.GetAsync(ticker);

            _playgroundProcessor.Initialize(company, historicalData, indicators);

            return Ok();
        }


        public void Reset(int bars, int date)
        {
            _initialQuotes = _quotes.Where(q => q.Date.ToInt() <= date).ToList().TakeLast(bars * 5);
            _weekly = _initialQuotes.ToWeeekly();

            //_chartDataModel.Daily
            CalculateIndicators();
        }

        private void CalculateIndicators()
        {
            foreach (var indicator in _idicators)
            {
                var calc = _indicatorProcessorFactory.Create(indicator);
                if (calc != null)
                {
                    
                    var quotes = indicator.Period == QuotePeriod.Daily ? _initialQuotes : _weekly;
                    var indicatorResult = calc.Calculate(indicator, quotes);


                }
            }
        }

        public void Next()
        {

        }

    }
}
