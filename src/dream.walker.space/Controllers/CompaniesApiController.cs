using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Models;
using dream.walker.data.Requests;
using dream.walker.data.Services;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/company")]
    public class CompaniesApiController : ApiController
    {
        private readonly ICompanyService _service;

        public CompaniesApiController(ICompanyService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("{ticker}")]
        [ResponseType(typeof(Company))]
        public async Task<IHttpActionResult> GetCompany(string ticker)
        {
            var company = await _service.GetAsync(ticker);

            return Ok(company);
        }

        [HttpPost]
        [Route("search")]
        [ResponseType(typeof(List<CompanyDetails>))]
        public async Task<IHttpActionResult> Search([FromBody] CompanySearchRequest request)
        {
            var rules = await _service.SearchAsync(request);

            return Ok(rules);
        }

    }
}
