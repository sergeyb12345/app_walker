using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;
using dream.walker.data.Services;
using dream.walker.space.Models.Articles;

namespace dream.walker.space.Controllers
{
    [RoutePrefix("api/rule")]
    public class RulesApiController : ApiController
    {
        private readonly IRuleService _ruleService;

        public RulesApiController(IRuleService ruleService)
        {
            _ruleService = ruleService;
        }

        [HttpGet]
        [Route("{id:int:min(1)}")]
        [ResponseType(typeof(Rule))]
        public async Task<IHttpActionResult> GetRule(int id)
        {
            var rule = await _ruleService.GetRuleAsync(id);

            return Ok(rule);
        }

        [HttpGet]
        [Route("{period:int}/all")]
        [ResponseType(typeof(List<Rule>))]
        public async Task<IHttpActionResult> GetRules(int period)
        {
            var rules = await _ruleService.GetRules((QuotePeriod)period);

            return Ok(rules);
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(Rule))]
        public async Task<IHttpActionResult> SaveArticle([FromBody] Rule model)
        {

            var rule = await _ruleService.SaveRuleAsync(model);

            return Ok(rule);
        }
    }
}
