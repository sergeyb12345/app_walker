using System.Runtime.Serialization;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity.Owin;
using dream.walker.space.Models;

namespace dream.walker.space.Controllers
{
    public class AccountApiController : ApiController
    {
        private readonly ApplicationSignInManager _signInManager;

        public AccountApiController()
        {
            _signInManager = HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
        }

        public AccountApiController(ApplicationSignInManager signInManager)
        {
            _signInManager = signInManager;
        }


        [HttpPost]
        [Route("api/account/login")]
        public async Task<IHttpActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);
            return Ok(result);
        }

        [HttpGet]
        [Route("api/account/isAuthenticated")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult IsAuthenticated()
        {
            var result = User?.Identity != null && User.Identity.IsAuthenticated;

            return Ok(result);
        }
    }
}
