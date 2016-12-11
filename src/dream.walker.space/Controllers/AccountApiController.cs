using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity.Owin;
using dream.walker.space.Models;
using Microsoft.Owin.Security;
using Microsoft.AspNet.Identity;

namespace dream.walker.space.Controllers
{
    public class AccountApiController : ApiController
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountApiController()
        {
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }

        [HttpPut]
        [Route("api/account/update")]
        [ResponseType(typeof(UpdateProfileResponse))]
        public async Task<IHttpActionResult> UpdateProfile([FromBody] UserInfo model)
        {
            var result = new UpdateProfileResponse()
            {
                User = model,
                Status = UpdateProfileStatus.Failure
            };

            if (!ModelState.IsValid)
            {
                result.Status = UpdateProfileStatus.ValidationError;
                result.ModelState = ModelState;
                return Ok(result);
            }

            if (User?.Identity != null)
            {
                if (User.Identity.IsAuthenticated)
                {
                    var user = await UserManager.FindByEmailAsync(User.Identity.Name);

                    user.FirstName = model.FirstName;
                    var response = await UserManager.UpdateAsync(user);
                    if (response.Succeeded)
                    {
                        result.Status = UpdateProfileStatus.Success;
                    }
                }
            }
            return Ok(result);

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

            var signInStatus = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: false);

            if (signInStatus == SignInStatus.Success)
            {
                var user = await UserManager.FindByEmailAsync(User.Identity.Name);

                result.Status =  LoginStatus.Success;
                result.User.IsAuthenticated = true;
                result.User.Username = user.UserName;
                result.User.FirstName = user.FirstName;
            }
           
            return Ok(result);
        }


        [HttpPost]
        [Route("api/account/logout")]
        public IHttpActionResult Logout()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return Ok();
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
        public async Task<IHttpActionResult> CurrentUser()
        {

            var result = new UserInfo();
            if (User?.Identity != null)
            {
                if (User.Identity.IsAuthenticated)
                {
                    var user = await UserManager.FindByEmailAsync(User.Identity.Name);

                    result.Username = user.UserName;
                    result.IsAuthenticated = true;
                    result.FirstName = user.FirstName;
                }
            }
            return Ok(result);
        }

    }

    public class UpdateProfileResponse
    {
        public UpdateProfileResponse()
        {
            User = new UserInfo();
        }

        public UpdateProfileStatus Status { get; set; }
        public UserInfo User { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }

    public enum UpdateProfileStatus
    {
        Success = 0,
        Failure = 3,
        ValidationError = 99,

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
        public string FirstName { get; set; }
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
