using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using dream.walker.data.Enums;
using dream.walker.space.Services;
using dream.walker.space.Services.Requests;

namespace dream.walker.space.Controllers
{
    public class ChartController : Controller
    {
        private readonly IChartDataService _chartDataService;

        public ChartController(IChartDataService chartDataService)
        {
            _chartDataService = chartDataService;
        }

        // GET: Chart
        public JsonResult GetChartData(string ticker)
        {
            var data = _chartDataService.GetChartData(new GetChartDataRequest()
            {
                Ticker = ticker,
                QuotePeriod = QuotePeriod.Daily
            });
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}