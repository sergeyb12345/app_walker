﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace dream.walker.space.Controllers
{
    public class HealthController : Controller
    {
        // GET: Health
        public ActionResult Check()
        {
            return Content("OK");
        }
    }
}