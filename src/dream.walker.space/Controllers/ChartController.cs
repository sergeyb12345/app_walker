using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using dream.walker.space.Services;

namespace dream.walker.space.Controllers
{
    public class ChartController : Controller
    {
        private IChartDataService _chartDataService;

        public ChartController(IChartDataService chartDataService)
        {
            _chartDataService = chartDataService;
        }

        // GET: Chart
        public JsonResult GetChartData(string ticker)
        {
            var data = _chartDataService.GetChartData(ticker);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}