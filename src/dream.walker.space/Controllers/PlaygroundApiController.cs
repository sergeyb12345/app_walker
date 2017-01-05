using dream.walker.data.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using dream.walker.calculators.IndicatorProcessor;
using dream.walker.reader.Models;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using dream.walker.data.Extensions;
using dream.walker.indicators.Models;
using dream.walker.space.Services.Models;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/playground")]
    public class PlaygroundApiController : ApiController
    {
        private IStrategyService _strategyService;
        private IPlaygroundService _playgroundService;

        private IDataCache _cache;
        private readonly IndicatorProcessorFactory _indicatorProcessorFactory;

        public List<QuotesModel> _quotes;
        public List<Indicator> _idicators;
        private List<QuotesModel> _initialQuotes;
        private List<QuotesModel> _weekly;
        private int _visibleBars;

        private ChartData _chartData;

        public PlaygroundApiController(IStrategyService strategyService, IPlaygroundService playgroundService, IDataCache cache, IndicatorProcessorFactory indicatorProcessorFactory)
        {
            _strategyService = strategyService;
            _playgroundService = playgroundService;
            _cache = cache;
            _indicatorProcessorFactory = indicatorProcessorFactory;
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
            _visibleBars = bars;
            _initialQuotes = _quotes.Where(q => q.Date.ToInt() <= date).ToList().TakeLast(bars * 5);
            _weekly = _initialQuotes.ToWeeekly();

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

    public class ChartDataModel
    {
        public ChartDataModel()
        {
            Weekly = new ChartData();
            Daily = new ChartData();    
        }

        public ChartData Weekly { get; set; }
        public ChartData Daily { get; set; }
    }

    public class ChartData
    {
        public ChartData()
        {
            Company = new CommpanyChartData();
            Indicators = new List<IndicatorChartData>();    
        }

        public CommpanyChartData Company { get; set; }
        public List<IndicatorChartData> Indicators { get; set; }

    }

    public class IndicatorChartData
    {
        public IndicatorChartData()
        {
            Values = new List<IndicatorModel>();    
        }

        public IndicatorChartData(Indicator indicator)
            :this()
        {
            Name = $"{indicator.Name.ToUpper()} ({string.Join(",", indicator.Params.Select(p => p.Value).ToArray())})";
            ChartType = indicator.ChartType.ToString().ToLower();
            ChartColor = indicator.ChartColor;
            CompanyPlot = indicator.ChartPlotNumber == 0;
        }

        public IndicatorChartData(Indicator indicator, List<IndicatorModel> values)
            :this(indicator)
        {
            Values = values;
        }

        public bool CompanyPlot { get; set; }
        public string ChartColor { get; set; }
        public string ChartType { get; set; }
        public string Name { get; set; }
        public List<IndicatorModel> Values { get; set; }
    }

    public class CommpanyChartData
    {
        public CommpanyChartData()
        {
            Quotes = new List<QuotesModel>();
        }

        public string Name { get; set; }
        public List<QuotesModel> Quotes { get; set; }

    }
}
