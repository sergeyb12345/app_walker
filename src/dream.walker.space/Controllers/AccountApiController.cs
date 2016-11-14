using System.Threading.Tasks;
using System.Web.Http;
using dream.walker.space.Models;
using Microsoft.AspNet.Identity.Owin;

namespace dream.walker.space.Controllers
{
    [Route("api/account")]

    public class AccountApiController : ApiController
    {
        private readonly ApplicationSignInManager _signInManager;

        public AccountApiController(ApplicationSignInManager signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<SignInStatus> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return  SignInStatus.RequiresVerification;
            }

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);
            return result;
        }

        [HttpGet]
        public bool IsLoggedIn()
        {
            return User?.Identity != null && User.Identity.IsAuthenticated;
        }
    }
}
