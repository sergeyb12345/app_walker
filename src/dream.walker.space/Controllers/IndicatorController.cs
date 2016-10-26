using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace dream.walker.space.Controllers
{
    public class IndicatorController : Controller
    {
        public IndicatorController()
        {
            
        }

        // GET: Indicator
        public JsonResult Ohlc()
        {
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}