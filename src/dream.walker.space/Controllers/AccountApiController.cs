using System.Runtime.Serialization;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity.Owin;
using dream.walker.space.Models;
using Newtonsoft.Json;

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
        [ResponseType(typeof(LoginResponse))]
        public async Task<IHttpActionResult> Login([FromBody] LoginViewModel model)
        {
            var result = new LoginResponse {Status = LoginStatus.RequiresVerification};

            if (!ModelState.IsValid)
            {
                result.Status = LoginStatus.ValidationError;
                result.ModelState = ModelState;
                return Ok(result);
            }

            var signInStatus = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);

            if (signInStatus == SignInStatus.Success)
            {
                var user = User.Identity;
                result.Status =  LoginStatus.Success;
                result.User.IsAuthenticated = user.IsAuthenticated;
                result.User.Username = user.Name;
            }
           
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

        [HttpGet]
        [Route("api/account/user")]
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult CurrentUser()
        {

            var result = new UserInfo();
            if (User?.Identity != null)
            {
                result.Username = User.Identity.Name;
                result.IsAuthenticated = User.Identity.IsAuthenticated;
            }
            return Ok(result);
        }

    }

    public class LoginResponse
    {
        public LoginResponse()
        {
            User = new UserInfo();
        }

        public LoginStatus Status { get; set; }
        public UserInfo User { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }

    public class UserInfo
    {
        public string Username { get; set; }
        public bool IsAuthenticated { get; set; }
    }

    public enum LoginStatus
    {
        Success = 0,
        LockedOut = 1,
        RequiresVerification = 2,
        Failure = 3,
        ValidationError = 99,

    }
}
