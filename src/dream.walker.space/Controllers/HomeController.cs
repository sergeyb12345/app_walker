using dream.walker.data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace dream.walker.space.Controllers
{
    public class HomeController : Controller
    {
        private ICompanyRepository _companyRepository;

        public HomeController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SinglePageApp()
        {
            return View("AureliaStartPage");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Chart()
        {
            ViewBag.Message = "Charts.";

            return View();
        }
    }
}