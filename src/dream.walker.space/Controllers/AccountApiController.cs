﻿using System.Runtime.Serialization;
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
